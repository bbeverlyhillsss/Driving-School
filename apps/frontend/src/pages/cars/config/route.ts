import type { RouteRecordRaw } from 'vue-router'
import CarsPage from '../ui/CarsPage.vue'

import { CARS_LINK } from '@/shared/config'
export { CARS_LINK }

export const CARS_ROUTE = {
  path: '/cars',
  name: CARS_LINK.name,
  component: CarsPage,
} satisfies RouteRecordRaw