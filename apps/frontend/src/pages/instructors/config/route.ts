import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import InstructorsPage from '../ui/InstructorsPage.vue'

const INSTRUCTORS_ROUTE_NAME = 'instructors'

export const INSTRUCTORS_LINK = {
  name: INSTRUCTORS_ROUTE_NAME,
} as const satisfies RouteLocationRaw

export const INSTRUCTORS_ROUTE = {
  path: '/instructors',
  name: INSTRUCTORS_ROUTE_NAME,
  component: InstructorsPage,
} satisfies RouteRecordRaw
