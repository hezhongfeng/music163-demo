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

    // 注意 ，这里使用两个 viewName 完成了页面的跳转，next 的页面被预加载
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
  position: relative;
}
</style>
