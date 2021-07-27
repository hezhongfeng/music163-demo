<template>
  <div class="session1" ref="page"></div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, nextTick } from 'vue';
import Mask from '@/components/mask';

export default defineComponent({
  name: 'session1',
  components: {},
  props: {},
  setup(props) {
    onMounted(() => {
      const mask = Mask();
      nextTick(() => {
        mask.component.ctx.show();
      });
    });
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
