<template>
  <div class="session1" ref="page" @click="onNext">Session1</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useNext from '../useNext';

export default defineComponent({
  name: 'session1',
  components: {},
  props: {},
  setup() {
    const { nextPage } = useNext();

    const onNext = () => {
      nextPage({
        currentViewName: 'session2',
        nextViewName: 'session5'
      });
    };

    return { onNext };
  }
});
</script>

<style lang="scss">
.session1 {
  width: 100%;
  height: 100vh;
  flex-shrink: 0;
}
</style>
