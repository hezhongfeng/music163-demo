import { Ref, onMounted, inject, VNode } from 'vue';

export default function useAnime() {
  const Mask = inject('mask') as Function;

  let mask: any = null;

  onMounted(() => {
    mask = Mask();
  });

  const showAnimation = () => {
    // 注意这里不能使用ctx
    mask.component.proxy.show();
  };

  return { showAnimation };
}
