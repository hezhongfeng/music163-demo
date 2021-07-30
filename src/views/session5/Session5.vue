<template>
  <div class="session5"></div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'session5',
  components: {},
  props: {},
  setup(props) {
    const count = ref(0);
    return { count };
  }
});
</script>

<style lang="scss">
.session5 {
  width: 100%;
  height: 100vh;
  flex-shrink: 0;
  background-image: linear-gradient(rgb(200, 240, 255), rgb(219, 255, 241));
}
</style>
