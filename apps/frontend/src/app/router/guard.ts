import type { Router } from 'vue-router'
import { useUserStore } from '@/entities/user'
import { AUTH_SECTION_ROUTE } from '@/pages/auth/config/routes'
import { LOGIN_LINK } from '@/shared/config'
import { ROLE_HOME_LINK } from './role-home'

export const setupAuthGuard = (router: Router): void => {
  router.beforeEach(async (to) => {
    const userStore = useUserStore()
    await userStore.ensureInitialized()

    const isAuthPage = to.matched.some((record) => record.name === AUTH_SECTION_ROUTE.name)
    const role = userStore.role

    if (!role) {
      return isAuthPage ? true : LOGIN_LINK
    }

    const homeLink = ROLE_HOME_LINK[role]

    if (isAuthPage) {
      return homeLink
    }

    const allowedRoles = to.meta.roles
    if (allowedRoles && !allowedRoles.includes(role)) {
      return homeLink
    }

    return true
  })
}
