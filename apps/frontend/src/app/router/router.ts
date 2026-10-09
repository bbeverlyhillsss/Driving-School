import { createRouter, createWebHistory } from 'vue-router'

import { AUTH_SECTION_ROUTE } from '@/pages/auth/config/routes'
import { MAIN_ROUTE } from '@/pages/main'
import { SideBarLayout, AuthLayout } from '../layouts'
import { MAIN_LINK } from '@/shared/config'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      ...AUTH_SECTION_ROUTE,
      component: AuthLayout,
    },
    {
      path: MAIN_ROUTE.path,
      redirect: MAIN_LINK,
      children: [
        {
          path: '',
          name: MAIN_ROUTE.name,
          component: MAIN_ROUTE.component,
        },
      ],
      component: SideBarLayout,
    },
  ],
})

export default router
