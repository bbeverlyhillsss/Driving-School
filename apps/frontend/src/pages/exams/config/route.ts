import type { RouteRecordRaw } from 'vue-router'
import { Role } from '@driving-school/shared'
import ExamsPage from '../ui/ExamsPage.vue'

import { EXAMS_LINK } from '@/shared/config'
export { EXAMS_LINK }

export const EXAMS_ROUTE = {
  path: '/exams',
  name: EXAMS_LINK.name,
  component: ExamsPage,
  meta: { roles: [Role.ADMIN] },
} satisfies RouteRecordRaw