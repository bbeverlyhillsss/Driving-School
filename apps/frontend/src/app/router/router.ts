import { createRouter, createWebHistory } from 'vue-router'

import { AUTH_SECTION_ROUTE } from '@/pages/auth/config/routes'
import { MAIN_ROUTE } from '@/pages/main'
import { SideBarLayout, AuthLayout } from '../layouts'
import { MAIN_LINK } from '@/shared/config'
import { ADMIN_ROUTE } from '@/pages/admin'
import { INSTRUCTOR_ROUTE } from '@/pages/instructor'

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
          meta: MAIN_ROUTE.meta,
        },
        ADMIN_ROUTE,
        INSTRUCTOR_ROUTE,
      ],
      component: SideBarLayout,
    },
  ],
})

export default router
