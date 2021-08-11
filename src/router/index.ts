import { createRouter, createWebHistory } from 'vue-router';

const Index1 = () => import('views/index1/Index1.vue');
const Index2 = () => import('views/index2/Index2.vue');
const Session1 = () => import('views/session1/Session1.vue');
const Session2 = () => import('views/session2/Session2.vue');
const Session5 = () => import('views/session5/Session5.vue');

const routes = [
  {
    path: '/',
    components: {
      default: Index1,
      index2: Index2,
      session1: Session1,
      session2: Session2,
      session5: Session5
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
