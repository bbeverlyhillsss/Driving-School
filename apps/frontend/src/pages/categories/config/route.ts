import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import CategoriesPage from '../ui/CategoriesPage.vue'

const CATEGORIES_ROUTE_NAME = 'categories'

export const CATEGORIES_LINK = {
  name: CATEGORIES_ROUTE_NAME,
} as const satisfies RouteLocationRaw

export const CATEGORIES_ROUTE = {
  path: '/categories',
  name: CATEGORIES_ROUTE_NAME,
  component: CategoriesPage,
} satisfies RouteRecordRaw
