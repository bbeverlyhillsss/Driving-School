import type { RouteRecordRaw } from 'vue-router'
import InstructorsPage from '../ui/InstructorsPage.vue'

import { INSTRUCTORS_LINK } from '@/shared/config'
export { INSTRUCTORS_LINK }

export const INSTRUCTORS_ROUTE = {
  path: '/cars',
  name: INSTRUCTORS_LINK.name,
  component: InstructorsPage,
} satisfies RouteRecordRaw