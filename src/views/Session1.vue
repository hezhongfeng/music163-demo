<template>
  <div class="session1" ref="page" @click="onEnter">Session1</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'session1',
  components: {},
  props: {},
  setup() {
    const Mask = inject('mask');
    let mask = null;
    const store = useStore();

    onMounted(() => {
      mask = Mask();
    });

    const onEnter = () => {
      mask.component.ctx.show();
      setTimeout(() => {
        store.commit('routeNext', {
          currentViewName: 'session2',
          nextViewName: ''
        });
      }, 500);
    };

    return { onEnter };
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
