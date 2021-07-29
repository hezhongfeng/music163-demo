import { onMounted, inject } from 'vue';

export default function useAnime() {
  const Mask = inject('mask');
  let mask = null;

  onMounted(() => {
    mask = Mask();
  });

  const showAnimation = () => {
    mask.component.ctx.show();
  };

  return { showAnimation };
}
