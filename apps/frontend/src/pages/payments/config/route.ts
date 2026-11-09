import type { RouteRecordRaw } from 'vue-router'
import { Role } from '@driving-school/shared'
import PaymentsPage from '../ui/PaymentsPage.vue'

import { PAYMENTS_LINK } from '@/shared/config'
export { PAYMENTS_LINK }

export const PAYMENTS_ROUTE = {
  path: '/payments',
  name: PAYMENTS_LINK.name,
  component: PaymentsPage,
  meta: { roles: [Role.ADMIN] },
} satisfies RouteRecordRaw