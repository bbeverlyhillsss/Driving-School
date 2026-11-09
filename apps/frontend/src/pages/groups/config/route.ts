import type { RouteRecordRaw } from 'vue-router'
import GroupsPage from '../ui/GroupsPage.vue'

import { GROUPS_LINK } from '@/shared/config'
export { GROUPS_LINK }

export const GROUPS_ROUTE = {
  path: '/groups',
  name: GROUPS_LINK.name,
  component: GroupsPage,
} satisfies RouteRecordRaw