import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import Mask from './components/mask';

const app = createApp(App);

app.use(Mask);
app.use(router);
app.use(store);
app.mount('#app');
