import type { RouteRecordRaw } from 'vue-router'
import { LOGIN_LINK } from '@/shared/config/'

export const LOGIN_ROUTE = {
  path: 'login',
  name: LOGIN_LINK.name,
  component: () => import('../ui/LoginPage.vue'),
} as const satisfies RouteRecordRaw
