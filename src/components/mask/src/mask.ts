import MaskConstructor from './index.vue';
import { createVNode, render } from 'vue';

let instance: any = null;

const Mask: any = function (): any {
  if (!instance) {
    const container = document.createElement('div');
    instance = createVNode(MaskConstructor);
    render(instance, container);
    document.body.appendChild(container);
  }
  return instance;
} as any;

export default Mask;
