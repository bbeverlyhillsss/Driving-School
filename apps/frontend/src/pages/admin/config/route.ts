import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import { Role } from '@driving-school/shared'
import AdminPage from '../ui/AdminPage.vue'

const ADMIN_ROUTE_NAME = 'admin'

export const ADMIN_LINK = {
  name: ADMIN_ROUTE_NAME,
} as const satisfies RouteLocationRaw

export const ADMIN_ROUTE = {
  path: '/admin',
  name: ADMIN_ROUTE_NAME,
  component: AdminPage,
  meta: { roles: [Role.ADMIN] },
} satisfies RouteRecordRaw
