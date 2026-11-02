import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import CarsPage from '../ui/CarsPage.vue'

const CARS_ROUTE_NAME = 'cars'

export const CARS_LINK = {
  name: CARS_ROUTE_NAME,
} as const satisfies RouteLocationRaw

export const CARS_ROUTE = {
  path: '/cars',
  name: CARS_ROUTE_NAME,
  component: CarsPage,
} satisfies RouteRecordRaw