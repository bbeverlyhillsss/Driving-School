import type {  RouteRecordRaw } from 'vue-router'
import CategoriesPage from '../ui/CategoriesPage.vue'

import { CATEGORIES_LINK } from '@/shared/config'
export { CATEGORIES_LINK }

export const CATEGORIES_ROUTE = {
  path: '/categories',
  name: CATEGORIES_LINK.name,
  component: CategoriesPage,
} satisfies RouteRecordRaw