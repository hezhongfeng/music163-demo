import { useStore } from 'vuex';
import useAnime from 'components/mask/useAnime';

export default function useNext() {
  const store = useStore();
  const { showAnimation } = useAnime();

  interface ViewName {
    currentViewName: string;
    nextViewName: string;
  }

  const nextPage = (view: ViewName) => {
    showAnimation();
    setTimeout(() => {
      store.commit('routeNext', view);
    }, 500);
  };

  return { nextPage };
}
