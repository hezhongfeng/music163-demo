<template>
  <router-view :name="currentViewName"></router-view>
  <router-view :name="nextViewName"></router-view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup: () => {
    const store = useStore();

    const currentViewName = computed(() => store.getters.currentViewName);
    const nextViewName = computed(() => store.getters.nextViewName);

    return { currentViewName, nextViewName };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
