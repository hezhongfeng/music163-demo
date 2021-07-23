import { createRouter, createWebHashHistory } from 'vue-router';

import Index from 'views/Index.vue';
import Session1 from 'views/Session1.vue';

const routes = [
  { path: '/', component: Index },
  { path: '/session1', component: Session1 }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
