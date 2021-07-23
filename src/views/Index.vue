<template>
  <div class="index">
    <div class="loading">
      <div class="title" @click="onEnter">进入</div>
      <div class="desc">请打开声音</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'index',
  props: {},
  setup: () => {
    const router = useRouter();

    const onEnter = () => {
      router.push('session1');
    };

    return { onEnter };
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
}
</style>
