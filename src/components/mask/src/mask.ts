import MaskConstructor from './index.vue';
import { createVNode, render } from 'vue';

let instance: any = null;

const Mask: any = function (): any {
  // 这里保证 canvas 一直存在，并且只存在一份，只有在需要动效的时候覆盖页面
  if (!instance) {
    const container = document.createElement('div');
    instance = createVNode(MaskConstructor);
    render(instance, container);
    document.body.appendChild(container);
  }
  return instance;
} as any;

export default Mask;
