import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/stores/auth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'text-primary font-semibold',

  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/register.vue'),
      meta: {
        title: 'Register',
        guest: true
      },
    },

    {
      path: '/companies/create',
      name: 'companies.create',
      component: () => import('../views/companies/create.vue'),
      meta: {
        title: 'Companies Create',
        guest: true
      },
    },
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
      path: '/cashbox',
      name: 'cashbox',
      component: () => import('../views/cashbox.vue'),
      meta: {
        title: 'Cashbox',
        auth: true
      },
    },

    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('../views/transactions.vue'),
      meta: {
        title: 'Transactions',
        auth: true
      },
    },

    {
      path: '/customer/:id/show',
      name: 'customer.show',
      component: () => import('../views/customers/show.vue'),
      meta: {
        title: 'Customer show',
        auth: true
      },
    },

    {
      path: '/customer/:id/report',
      name: 'customer.report',
      component: () => import('../views/customers/report.vue'),
      meta: {
        title: 'Customer report',
        auth: true
      },
    },

    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/settings/profile.vue'),
      meta: {
        title: 'Profile',
        auth: true
      },
    },

    {
      path: '/users/create',
      name: 'users.create',
      component: () => import('../views/users/create.vue'),
      meta: {
        title: 'Create Users',
        auth: true
      },
    },

    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings/index.vue'),
      meta: {
        title: 'Profile',
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
