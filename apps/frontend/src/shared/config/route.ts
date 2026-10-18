import type { RouteLocationRaw } from 'vue-router'

const ROOT_ROUTE_NAME = 'root'

export const ROOT_LINK = {
  name: ROOT_ROUTE_NAME,
} as const satisfies RouteLocationRaw

const LOGIN_ROUTE_NAME = 'login'

export const LOGIN_LINK = {
  name: LOGIN_ROUTE_NAME,
} as const satisfies RouteLocationRaw
