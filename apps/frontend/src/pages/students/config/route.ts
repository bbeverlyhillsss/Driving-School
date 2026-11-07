import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import { Role } from '@driving-school/shared'
import StudentsPage from '../ui/StudentsPage.vue'

const STUDENTS_ROUTE_NAME = 'students'

export const STUDENTS_LINK = {
  name: STUDENTS_ROUTE_NAME,
} as const satisfies RouteLocationRaw

export const STUDENTS_ROUTE = {
  path: '/students',
  name: STUDENTS_ROUTE_NAME,
  component: StudentsPage,
  meta: { roles: [Role.ADMIN] },
} satisfies RouteRecordRaw