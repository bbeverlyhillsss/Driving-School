import type { Router } from 'vue-router'
import { useUserStore } from '@/entities/user/'
import { http } from '@/shared/api'
import { LOGIN_LINK } from '@/shared/config'

export const setupSession = (router: Router): void => {
  const userStore = useUserStore()

  http.setRefreshHandler(async () => {
    const restored = await userStore.restoreSession()
    if (!restored) await router.push(LOGIN_LINK)
    return restored
  })
}
