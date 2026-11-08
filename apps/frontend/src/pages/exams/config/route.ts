import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import { Role } from '@driving-school/shared'
import ExamsPage from '../ui/ExamsPage.vue'

const EXAMS_ROUTE_NAME = 'exams'

export const EXAMS_LINK = {
  name: EXAMS_ROUTE_NAME,
} as const satisfies RouteLocationRaw

export const EXAMS_ROUTE = {
  path: '/exams',
  name: EXAMS_ROUTE_NAME,
  component: ExamsPage,
  meta: { roles: [Role.ADMIN] },
} satisfies RouteRecordRaw