import { createRouter, createWebHistory } from 'vue-router'

import { AUTH_SECTION_ROUTE } from '@/pages/auth/config/routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      ...AUTH_SECTION_ROUTE,
      // component 'authLayout'
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/main/MainPage.vue'),
    },
  ],
})

export default router
