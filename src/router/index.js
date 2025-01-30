import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'text-indigo-500 font-semibold',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/index.vue'),
    },

    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('../views/accounts.vue'),
    },

    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('../views/wallet.vue'),
    },

    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings.vue'),
    },

  ],
})

export default router
