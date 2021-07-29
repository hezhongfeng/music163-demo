<template>
  <div class="index2" @click="onNext">
    <div class="bg">
      <video preload="auto" autoplay loop playsinline src="~assets/index2/bg.mp4"></video>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import useNext from '../useNext';

export default defineComponent({
  name: 'index2',
  components: {},
  props: {},
  setup() {
    const { nextPage } = useNext();

    const onNext = () => {
      nextPage({
        currentViewName: 'session1',
        nextViewName: 'session2'
      });
    };

    return { onNext };
  }
});
</script>

<style lang="scss">
.index2 {
  width: 100%;
  height: 100vh;
  .bg {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    video {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }
}
</style>
