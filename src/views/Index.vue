<template>
  <div class="index">
    <div class="loading" v-show="showLoading" :class="{ show: showLoading }">
      <div class="title" @click="onEnter">进入</div>
      <div class="desc">请打开声音</div>
    </div>
    <div class="ani" v-show="!showLoading" :class="{ hide: !showInit }">
      <div>
        <div class="number">1%</div>
        <div class="label">请打开声音</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, inject } from 'vue';
import { useStore } from 'vuex';
import anime from 'animejs/lib/anime.es.js';

export default defineComponent({
  name: 'index',
  props: {},
  setup: () => {
    const store = useStore();

    const Mask = inject('mask');

    let showLoading = ref(false);
    let showInit = ref(true);
    let mask = null;

    onMounted(() => {
      mask = Mask();
      // 旋转动画
      anime({
        targets: '.ani',
        rotate: {
          value: 360,
          duration: 3000,
          easing: 'easeInOutSine'
        },
        scale: {
          value: 10,
          duration: 3000,
          easing: 'easeInOutQuart'
        },
        'font-weight': {
          value: 800,
          durnion: 3000
        },
        complete() {
          // 旋转完成后，等待 1000ms 开始百分比消失动画
          setTimeout(() => {
            // 百分比消失动画完成后，开始loading显示动画
            setTimeout(() => {
              showLoading.value = true;
            }, 300);
            showInit.value = false;
          }, 500);
        }
      });

      const number = {
        value: 1
      };

      const objPropLogEl = document.querySelector('.number');

      // 数字变化动画
      anime({
        targets: number,
        value: 100,
        easing: 'linear',
        round: 1,
        duration: 2700,
        update: function () {
          objPropLogEl.innerHTML = JSON.stringify(number.value) + '%';
        }
      });
    });

    const onEnter = () => {
      mask.component.ctx.show();
      setTimeout(() => {
        store.commit('routeNext', {
          currentViewName: 'session1',
          nextViewName: 'session2'
        });
      }, 500);
    };

    return { onEnter, showLoading, showInit };
  }
});
</script>

<style lang="scss">
.index {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('assets/index/background.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50%;
  .loading {
    width: 55vw;
    height: 55vw;
    background-image: url('assets/index/Loading.svg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.52;
    .title {
      font-size: 20px;
      line-height: 1.8;
      font-weight: 600;
    }
    .desc {
      font-size: 14px;
      color: #191b18;
      opacity: 0.4;
    }
  }
  .ani {
    width: 55vw;
    height: 55vw;
    scale: 0.1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    transition: all 0.52;
  }
  .show {
    animation: show 0.5s;
  }

  @keyframes show {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .hide {
    animation: hide 0.3s;
  }

  @keyframes hide {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
}
</style>
