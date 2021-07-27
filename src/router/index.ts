import { createRouter, createWebHashHistory } from 'vue-router';

const Index = () => import('views/Index.vue');
const Session1 = () => import('views/Session1.vue');
const Session2 = () => import('views/Session2.vue');

const routes = [
  { path: '/', component: Index },
  { path: '/session1', component: Session1 },
  { path: '/session2', component: Session2 }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
