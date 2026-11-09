import type { RouteRecordRaw } from 'vue-router'
import { Role } from '@driving-school/shared'
import LessonsPage from '../ui/LessonsPage.vue'

import { LESSONS_LINK } from '@/shared/config'
export { LESSONS_LINK }

export const LESSONS_ROUTE = {
  path: '/lessons',
  name: LESSONS_LINK.name,
  component: LessonsPage,
  meta: { roles: [Role.ADMIN] },
} satisfies RouteRecordRaw