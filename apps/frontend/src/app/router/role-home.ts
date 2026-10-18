import type { RouteLocationRaw } from 'vue-router'
import { Role } from '@driving-school/shared'
import { ADMIN_LINK } from '@/pages/admin'
import { INSTRUCTOR_LINK } from '@/pages/instructor'
import { STUDENT_LINK } from '@/pages/student'

export const ROLE_HOME_LINK = {
  [Role.ADMIN]: ADMIN_LINK,
  [Role.INSTRUCTOR]: INSTRUCTOR_LINK,
  [Role.STUDENT]: STUDENT_LINK,
} as const satisfies Record<Role, RouteLocationRaw>
