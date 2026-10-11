import type { Router } from 'vue-router'
import { useUserStore } from '@/entities/user/model'
import { AUTH_SECTION_ROUTE } from '@/pages/auth/config/routes'
import { LOGIN_LINK } from '@/pages/auth/login/config/route'
import { MAIN_LINK } from '@/shared/config'

export const setupAuthGuard = (router: Router): void => {
  router.beforeEach(async (to) => {
    const userStore = useUserStore()
    await userStore.ensureInitialized()

    const isAuthPage = to.matched.some((record) => record.name === AUTH_SECTION_ROUTE.name)

    if (userStore.isUserAuth) {
      return isAuthPage ? MAIN_LINK : true
    }

    return isAuthPage ? true : LOGIN_LINK
  })
}
