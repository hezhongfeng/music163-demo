import { Ref, onMounted, inject, VNode } from 'vue';

export default function useAnime() {
  const Mask = inject('mask') as Function;

  let mask: any = null;

  onMounted(() => {
    mask = Mask();
  });

  const showAnimation = () => {
    mask.component.ctx.show();
  };

  return { showAnimation };
}
