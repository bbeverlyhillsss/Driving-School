import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import { Role } from '@driving-school/shared'
import InstructorPage from '../ui/InstructorPage.vue'

const INSTRUCTOR_ROUTE_NAME = 'instructor'

export const INSTRUCTOR_LINK = {
  name: INSTRUCTOR_ROUTE_NAME,
} as const satisfies RouteLocationRaw

export const INSTRUCTOR_ROUTE = {
  path: '/instructor',
  name: INSTRUCTOR_ROUTE_NAME,
  component: InstructorPage,
  meta: { roles: [Role.INSTRUCTOR] },
} satisfies RouteRecordRaw
