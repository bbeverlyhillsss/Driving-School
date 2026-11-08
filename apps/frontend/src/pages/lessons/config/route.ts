import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import { Role } from '@driving-school/shared'
import LessonsPage from '../ui/LessonsPage.vue'

const LESSONS_ROUTE_NAME = 'lessons'

export const LESSONS_LINK = {
  name: LESSONS_ROUTE_NAME,
} as const satisfies RouteLocationRaw

export const LESSONS_ROUTE = {
  path: '/lessons',
  name: LESSONS_ROUTE_NAME,
  component: LessonsPage,
  meta: { roles: [Role.ADMIN] },
} satisfies RouteRecordRaw