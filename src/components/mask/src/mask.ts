import MessageConstructor from './index.vue';
import { createVNode, render } from 'vue';

let vm: any;
const instances: any = [];
let seed = 1;

const Mask: any = function (): any {
  const id = 'message_' + seed++;

  const container = document.createElement('div');

  container.className = `container_${id}`;

  vm = createVNode(MessageConstructor, {}, null);

  render(vm, container);
  instances.push({ vm, $el: container });
  document.body.appendChild(container);
} as any;

export default Mask;
