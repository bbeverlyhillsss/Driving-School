import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import { Role } from '@driving-school/shared'
import StudentPage from '../ui/StudentPage.vue'

const STUDENT_ROUTE_NAME = 'student'

export const STUDENT_LINK = {
  name: STUDENT_ROUTE_NAME,
} as const satisfies RouteLocationRaw

export const STUDENT_ROUTE = {
  path: '/student',
  name: STUDENT_ROUTE_NAME,
  component: StudentPage,
  meta: { roles: [Role.STUDENT] },
} satisfies RouteRecordRaw
