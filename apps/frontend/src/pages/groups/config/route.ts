import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import GroupsPage from '../ui/GroupsPage.vue'

const GROUPS_ROUTE_NAME = 'groups'

export const GROUPS_LINK = {
  name: GROUPS_ROUTE_NAME,
} as const satisfies RouteLocationRaw

export const GROUPS_ROUTE = {
  path: '/groups',
  name: GROUPS_ROUTE_NAME,
  component: GroupsPage,
} satisfies RouteRecordRaw