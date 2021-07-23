<template>
  <div class="session1">Session1</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'session1',
  components: {},
  props: {},
  setup(props) {
    const count = ref(0);
    return { count };
  }
});
</script>

<style lang="scss">
.session1 {
}
</style>
