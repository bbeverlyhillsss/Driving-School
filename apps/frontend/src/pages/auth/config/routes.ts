import type { RouteRecordRaw } from 'vue-router'

import { REGISTER_LINK, REGISTER_ROUTE } from '../register/config/route'

const AUTH_ROUTE_NAME = 'auth'

export const AUTH_SECTION_LINKS = {
  REGISTER: REGISTER_LINK,
} as const

export const AUTH_SECTION_ROUTE = {
  path: '/auth',
  name: AUTH_ROUTE_NAME,
  children: [REGISTER_ROUTE],
  // redirect
} as const satisfies RouteRecordRaw
