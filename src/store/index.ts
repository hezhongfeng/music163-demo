import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      currentViewName: 'default',
      nextViewName: 'index2'
    };
  },
  getters: {
    currentViewName(state: any) {
      return state.currentViewName;
    },
    nextViewName(state: any) {
      return state.nextViewName;
    }
  },
  mutations: {
    routeNext(state: any, { currentViewName, nextViewName }) {
      state.currentViewName = currentViewName;
      state.nextViewName = nextViewName;
    }
  }
});

export default store;
