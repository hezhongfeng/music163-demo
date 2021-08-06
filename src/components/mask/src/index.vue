<template>
  <!-- 这个canvas会被渲染为 app 的子级 -->
  <teleport to="#app">
    <canvas class="mask-canvas" ref="canvas" :class="{ 'mask-canvas-posi': isShow }"></canvas>
  </teleport>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import anime from 'animejs/lib/anime.es.js';

export default defineComponent({
  name: 'mask',
  methods: {
    showw() {
      console.log('showw');
    }
  },
  setup(props) {
    const canvas = ref(null);

    const isShow = ref(false);

    let pageWidth: number = 0;
    let pageHeight: number = 0;

    let points: any = null;
    let ctx: any = null;

    const show = () => {
      isShow.value = true;
      const heights = [0, 0.5 * pageHeight, pageHeight];
      points = {
        p1: {
          x: pageWidth,
          y: heights[0]
        },
        p2: {
          x: pageWidth,
          y: heights[1]
        },
        p3: {
          x: pageWidth,
          y: heights[2]
        },
        p4: {
          x: pageWidth,
          y: heights[2]
        },
        p5: {
          x: pageWidth,
          y: heights[0]
        }
      };

      // P1点的变化
      anime({
        targets: points.p1,
        x: 0,
        easing: 'easeInQuart',
        delay: 50,
        duration: 500
      });

      // P2点的变化
      anime({
        targets: points.p2,
        x: 0,
        easing: 'easeInSine',
        duration: 500
      });

      anime({
        targets: points.p2,
        y: 0.6 * pageHeight,
        easing: 'easeInSine',
        duration: 500
      });

      // P3点的变化
      anime({
        targets: points.p3,
        x: 0,
        easing: 'easeInQuart',
        delay: 50,
        duration: 500
      });

      // 画曲线
      anime({
        duration: 550,
        update: function () {
          // 清除上一次的绘制
          ctx.clearRect(0, 0, pageWidth, pageHeight);
          ctx.beginPath();
          ctx.moveTo(points.p1.x, points.p1.y);
          // 幕布的上半区域
          ctx.bezierCurveTo(
            points.p1.x,
            points.p1.y,
            points.p2.x,
            points.p2.y - 0.2 * pageHeight,
            points.p2.x,
            points.p2.y
          );
          // 幕布的下半区域
          ctx.bezierCurveTo(
            points.p2.x,
            points.p2.y + 0.2 * pageHeight,
            points.p3.x,
            points.p3.y,
            points.p3.x,
            points.p3.y
          );
          // 已拉动部分的矩形区域
          ctx.lineTo(points.p4.x, points.p4.y);
          ctx.lineTo(points.p5.x, points.p5.y);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#f1f1f1';
          ctx.stroke();
        },
        complete: function () {
          isShow.value = false;
        }
      });
    };

    onMounted(() => {
      ctx = canvas.value.getContext('2d');

      pageWidth = document.getElementById('app').clientWidth;
      pageHeight = document.getElementById('app').clientHeight;

      canvas.value.width = pageWidth;
      canvas.value.height = pageHeight;

      ctx.fillStyle = '#f1f1f1';
    });

    return { canvas, show, isShow };
  }
});
</script>

<style lang="scss">
.mask-canvas {
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.mask-canvas-posi {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
