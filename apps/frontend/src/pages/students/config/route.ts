import type { RouteRecordRaw } from 'vue-router'
import { Role } from '@driving-school/shared'
import StudentsPage from '../ui/StudentsPage.vue'

import { STUDENTS_LINK } from '@/shared/config'
export { STUDENTS_LINK }

export const STUDENTS_ROUTE = {
  path: '/students',
  name: STUDENTS_LINK.name,
  component: StudentsPage,
  meta: { roles: [Role.ADMIN] },
} satisfies RouteRecordRaw