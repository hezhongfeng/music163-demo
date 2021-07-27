<template>
  <div class="session1" ref="page">
    <canvas class="mask" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import anime from 'animejs/lib/anime.es.js';

export default defineComponent({
  name: 'session1',
  components: {},
  props: {},
  setup(props) {
    const canvas = ref(null);
    const page = ref(null);

    let pageWidth: number = 0;
    let pageHeight: number = 0;

    const drawCloth = () => {
      console.log(111);
    };

    onMounted(() => {
      let ctx = canvas.value.getContext('2d');

      pageWidth = page.value.clientWidth;
      pageHeight = page.value.clientHeight;

      const heights = [0, 0.5 * pageHeight, pageHeight];
      const points = {
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

      const cps = 0.2 * pageHeight;

      canvas.value.width = pageWidth;
      canvas.value.height = pageHeight;

      ctx.fillStyle = '#f1f1f1';

      anime({
        targets: points.p1,
        x: 0,
        easing: 'easeInQuad',
        round: 10,
        delay: 50,
        duration: 600,
        update: function () {
          ctx.clearRect(0, 0, pageWidth, pageHeight);
          ctx.beginPath();
          ctx.moveTo(points.p1.x, points.p1.y);
          ctx.bezierCurveTo(
            points.p1.x,
            points.p1.y,
            points.p2.x,
            points.p2.y - 0.2 * pageHeight,
            points.p2.x,
            points.p2.y
          );
          ctx.bezierCurveTo(
            points.p2.x,
            points.p2.y + 0.2 * pageHeight,
            points.p3.x,
            points.p3.y,
            points.p3.x,
            points.p3.y
          );
          ctx.lineTo(points.p4.x, points.p4.y);
          ctx.lineTo(points.p5.x, points.p5.y);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#f1f1f1';
          ctx.stroke();
        }
      });

      anime({
        targets: points.p3,
        x: 0,
        easing: 'easeInQuad',
        round: 20,
        delay: 50,
        duration: 600,
        update: function () {}
      });

      anime({
        targets: points.p2,
        x: 0,
        easing: 'easeOutQuad',
        round: 20,
        duration: 650,
        update: function () {}
      });
    });

    return { drawCloth, canvas, page };
  }
});
</script>

<style lang="scss">
.session1 {
  .mask {
    width: 100vw;
    height: 100vh;
  }
}
</style>
