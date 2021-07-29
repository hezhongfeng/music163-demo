import { createRouter, createWebHashHistory } from 'vue-router';

const Index = () => import('views/index/Index.vue');
const Session1 = () => import('views/session1/Session1.vue');
const Session2 = () => import('views/session2/Session2.vue');

const routes = [
  {
    path: '/',
    components: {
      default: Index,
      session1: Session1,
      session2: Session2
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
