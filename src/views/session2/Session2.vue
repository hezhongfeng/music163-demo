<template>
  <div class="session2">Session2</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'session2',
  components: {},
  props: {},
  setup(props) {
    const count = ref(0);
    return { count };
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
