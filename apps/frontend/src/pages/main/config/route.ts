import type { RouteRecordRaw } from 'vue-router'
import { Role } from '@driving-school/shared'

import { ROOT_LINK } from '@/shared/config'

export const MAIN_ROUTE = {
  path: '/',
  name: ROOT_LINK.name,
  component: () => import('../ui'),
  meta: { roles: [Role.STUDENT] },
} as const satisfies RouteRecordRaw
