import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router'

const MAIN_ROUTE_NAME = 'main'

export const MAIN_LINK = {
  name: MAIN_ROUTE_NAME,
} as const satisfies RouteLocationRaw

export const MAIN_ROUTE = {
  path: '/',
  name: MAIN_LINK.name,
  component: () => import('../ui'),
} as const satisfies RouteRecordRaw
