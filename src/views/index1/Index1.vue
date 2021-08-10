<template>
  <div class="index1">
    <div class="loading" v-show="showLoading" :class="{ show: showLoading }">
      <div class="title" @click="onNext">进入</div>
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
import { defineComponent } from 'vue';
import useNext from '../useNext';
import useAnimation from './useAnimation';

export default defineComponent({
  name: 'index',
  props: {},
  setup: () => {
    const { nextPage } = useNext();

    const { showLoading, showInit } = useAnimation();

    const onNext = () => {
      nextPage({
        currentViewName: 'index2',
        nextViewName: 'session1'
      });
    };

    return { onNext, showLoading, showInit };
  }
});
</script>

<style lang="scss">
.index1 {
  height: 100vh;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('assets/index1/background.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50%;
  .loading {
    width: 55%;
    height: 55%;
    background-image: url('assets/index1/loading.svg');
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
    width: 55%;
    height: 55%;
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
