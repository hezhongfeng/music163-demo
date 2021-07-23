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
  display: flex;
  justify-content: center;
  align-items: center;
  .loading {
    width: 55vw;
    height: 55vw;
    background-image: url('assets/index/Loading.svg');
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
