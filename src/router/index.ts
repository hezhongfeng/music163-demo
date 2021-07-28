import { createRouter, createWebHashHistory } from 'vue-router';

const Index = () => import('views/Index.vue');
const Session1 = () => import('views/Session1.vue');
const Session2 = () => import('views/Session2.vue');

const routes = [
  {
    path: '/',
    components: {
      default: Index,
      session1: Session1,
      session2: Session2
    }
  }
  // { path: '/session1', name: 'session1', component: Session1 },
  // { path: '/session2', name: 'session2', component: Session2 }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
