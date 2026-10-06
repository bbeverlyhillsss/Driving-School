import { createRouter, createWebHistory } from 'vue-router'

import { AUTH_SECTION_ROUTE } from '@/pages/auth/config/routes'
import { MAIN_ROUTE, MAIN_LINK } from '@/pages/main'
import { SideBarLayout } from '../layouts'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      ...AUTH_SECTION_ROUTE,
      // component 'authLayout'
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
