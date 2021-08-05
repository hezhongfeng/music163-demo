import { useStore } from 'vuex';
import useAnime from 'components/mask/useAnime';

export default function useNext() {
  const store = useStore();
  const { showAnimation } = useAnime();

  const nextPage = ({ currentViewName, nextViewName }) => {
    showAnimation();
    setTimeout(() => {
      store.commit('routeNext', {
        currentViewName,
        nextViewName
      });
    }, 500);
  };

  return { nextPage };
}
