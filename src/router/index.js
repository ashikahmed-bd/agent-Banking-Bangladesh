import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/stores/auth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'text-primary font-semibold',

  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/login.vue'),
      meta: {
        title: 'Login',
        guest: true
      },
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/index.vue'),
      meta: {
        title: 'Home',
        auth: true
      },
    },

    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('../views/wallet.vue'),
      meta: {
        title: 'Wallet',
        auth: true
      },
    },

    {
      path: '/customers',
      name: 'customers',
      component: () => import('../views/customers.vue'),
      meta: {
        title: 'Customers',
        auth: true
      },
    },

    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings.vue'),
      meta: {
        title: 'Settings',
        auth: true
      },
    },

  ],
});


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  document.title = to.meta.title + ' - Smart Cash' || 'Not Found!';

  if (to.meta.auth && !authStore.loggedIn) {
    next({ name: 'login' });
  } else {
    next();
  }

})

export default router
