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
      path: '/wallet',
      name: 'wallet',
      component: () => import('../views/wallet.vue'),
    },

    {
      path: '/customers',
      name: 'customers',
      component: () => import('../views/customers.vue'),
    },

    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings.vue'),
    },

  ],
})

export default router
