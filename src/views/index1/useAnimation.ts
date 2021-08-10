import { ref, defineComponent, onMounted, inject } from 'vue';
import anime from 'animejs/lib/anime.es.js';

export default function useAnimation() {
  let showLoading = ref(false);
  let showInit = ref(true);

  const playAnime = () => {
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
        value: 700,
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
        }, 300);
      }
    });

    const number = {
      value: 1
    };

    const numberEl = document.querySelector('.number');

    // 数字变化动画
    anime({
      targets: number,
      value: 100,
      easing: 'linear',
      round: 1,
      duration: 2700,
      update: function () {
        numberEl!.innerHTML = number.value + '%';
      }
    });
  };

  onMounted(() => {
    playAnime();
  });

  return { showLoading, showInit };
}
