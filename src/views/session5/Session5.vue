<template>
  <div class="session5" ref="session5"></div>
</template>

<script lang="ts">
import { Ref, ref, defineComponent, onMounted } from 'vue';
import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import cloud from 'assets/session5/cloud.png';

export default defineComponent({
  name: 'session5',
  components: {},
  props: {},
  setup(props) {
    const session5: Ref<HTMLElement | null> = ref(null);
    const StartTime = Date.now();
    let camera: { position: { x: number; z: number } },
      scene: { background: any; add: (arg0: any) => void },
      renderer: {
        setSize: (arg0: number, arg1: number) => void;
        domElement: any;
        render: (arg0: any, arg1: any) => void;
      },
      mesh;

    // 云的个数
    const CloudCount = 1000;
    // 每个云所占z轴的长度
    const perCloudZ = 15;
    // 所有的云一共的Z轴长度
    const cameraPositionZ = CloudCount * perCloudZ;
    // X轴和Y轴平移的随机参数
    const RandomPositionX = 80;
    const RandomPositionY = 120;
    // 背景色，目前为天蓝色
    const BackGroundColor = '#1e4877';

    const pageWidth = document.getElementById('app')!.clientWidth;
    const pageHeight = document.getElementById('app')!.clientHeight;

    function init() {
      // 透视相机，只有距离相机1~500的物体才可以被渲染
      camera = new THREE.PerspectiveCamera(70, pageWidth / pageHeight, 1, 1000);
      // 相机的位置，平移下左右平衡
      camera.position.x = Math.floor(RandomPositionX / 2);
      // 最初在最远处
      camera.position.z = cameraPositionZ;

      // 线性雾，就是说雾化效果是随着距离线性增大的
      // 可以改变雾的颜色，发现远处的云的颜色有所变化
      const fog = new THREE.Fog(BackGroundColor, 1, 1000);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(BackGroundColor);

      const texture = new THREE.TextureLoader().load(cloud);

      // 一个平面形状
      const geometry = new THREE.PlaneGeometry(64, 64);
      const geometries = [];

      const vShader = `
        varying vec2 vUv;
        void main()
        {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `;
      const fShader = `
        uniform sampler2D map;
        uniform vec3 fogColor;
        uniform float fogNear;
        uniform float fogFar;
        varying vec2 vUv;
        void main()
        {
          float depth = gl_FragCoord.z / gl_FragCoord.w;
          float fogFactor = smoothstep( fogNear, fogFar, depth );
          gl_FragColor = texture2D(map, vUv );
          gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
          gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
        }
      `;
      // 贴图材质
      const material = new THREE.ShaderMaterial({
        // 这里的值是给着色器传递的
        uniforms: {
          map: {
            type: 't',
            value: texture
          },
          fogColor: {
            type: 'c',
            value: fog.color
          },
          fogNear: {
            type: 'f',
            value: fog.near
          },
          fogFar: {
            type: 'f',
            value: fog.far
          }
        },
        vertexShader: vShader,
        fragmentShader: fShader,
        transparent: true
      });

      for (var i = 0; i < CloudCount; i++) {
        const instanceGeometry = geometry.clone();

        // 把这个克隆出来的云，通过随机参数，做一些位移，达到一堆云彩的效果，每次渲染出来的云堆都不一样
        // X轴偏移后，通过调整相机位置达到平衡
        // Y轴想把云彩放在场景的偏下位置，所以都是负值
        // Z轴位移就是：当前第几个云*每个云所占的Z轴长度
        instanceGeometry.translate(Math.random() * RandomPositionX, -Math.random() * RandomPositionY, i * perCloudZ);

        geometries.push(instanceGeometry);
      }

      // 把这些形状合并
      const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries);

      // 把上面合并出来的形状和材质，生成一个物体
      mesh = new THREE.Mesh(mergedGeometry, material);
      // 添加进场景
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer({ antialias: false });
      renderer.setSize(pageWidth, pageHeight);

      session5.value!.appendChild(renderer.domElement);
    }

    function animate() {
      requestAnimationFrame(animate);

      // 从最远的z轴处开始往前一点一点的移动，达到穿越云层的目的
      camera.position.z = cameraPositionZ - (((Date.now() - StartTime) * 0.03) % cameraPositionZ);

      renderer.render(scene, camera);
    }

    onMounted(() => {
      init();
      animate();
    });
    return { session5 };
  }
});
</script>

<style lang="scss">
.session5 {
  width: 100%;
  height: 100vh;
  flex-shrink: 0;
  background-image: linear-gradient(rgb(200, 240, 255), rgb(219, 255, 241));
}
</style>
