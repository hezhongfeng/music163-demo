import { App } from 'vue';
import Mask from './src/mask';

(Mask as any).install = (app: App): void => {
  // Vue3 的 Composition API 建议使用 provide + inject 的方式注册和使用全局 property
  app.provide('mask', Mask);
};

export default Mask;
