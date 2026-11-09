import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import { Role } from '@driving-school/shared'
import PaymentsPage from '../ui/PaymentsPage.vue'

const PAYMENTS_ROUTE_NAME = 'payments'

export const PAYMENTS_LINK = {
  name: PAYMENTS_ROUTE_NAME,
} as const satisfies RouteLocationRaw

export const PAYMENTS_ROUTE = {
  path: '/payments',
  name: PAYMENTS_ROUTE_NAME,
  component: PaymentsPage,
  meta: { roles: [Role.ADMIN] },
} satisfies RouteRecordRaw