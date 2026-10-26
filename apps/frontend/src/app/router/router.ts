import { createRouter, createWebHistory } from 'vue-router'

import { AUTH_SECTION_ROUTE } from '@/pages/auth/config/routes'
import { SideBarLayout, AuthLayout } from '../layouts'
import { ROOT_LINK } from '@/shared/config'
import { STUDENT_ROUTE } from '@/pages/student'
import { ADMIN_ROUTE } from '@/pages/admin'
import { INSTRUCTOR_ROUTE } from '@/pages/instructor'
import { CATEGORIES_ROUTE } from '@/pages/caregories'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      ...AUTH_SECTION_ROUTE,
      component: AuthLayout,
    },
    {
      path: '/',
      component: SideBarLayout,
      children: [
        {
          path: '',
          name: ROOT_LINK.name,
          component: { render: () => null },
        },
        STUDENT_ROUTE,
        ADMIN_ROUTE,
        INSTRUCTOR_ROUTE,
        CATEGORIES_ROUTE,
      ],
    },
  ],
})

export default router
