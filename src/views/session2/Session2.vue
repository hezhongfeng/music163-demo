<template>
  <div class="session2" @click="onNext">Session2</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import useNext from '../useNext';

export default defineComponent({
  name: 'session2',
  components: {},
  props: {},
  setup(props) {
    const { nextPage } = useNext();

    const onNext = () => {
      nextPage({
        currentViewName: 'session5',
        nextViewName: ''
      });
    };

    return { onNext };
  }
});
</script>

<style lang="scss">
.session2 {
  width: 100%;
  height: 100vh;
  flex-shrink: 0;
}
</style>
