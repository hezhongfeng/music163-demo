import { App } from 'vue';
import Mask from './src/mask';

(Mask as any).install = (app: App): void => {
  app.config.globalProperties.$mask = Mask;
};

export default Mask;
