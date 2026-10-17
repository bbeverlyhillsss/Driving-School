import type { RouteRecordRaw } from 'vue-router'
import { Role } from '@driving-school/shared'

import { MAIN_LINK } from '@/shared/config'

export const MAIN_ROUTE = {
  path: '/',
  name: MAIN_LINK.name,
  component: () => import('../ui'),
  meta: { roles: [Role.STUDENT] },
} as const satisfies RouteRecordRaw
