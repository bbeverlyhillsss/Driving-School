import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { AuthResponse, SharedUser } from '@driving-school/shared'
import { http } from '@/shared/api'
import { refresh } from '../api/refresh'

export const useUserStore = defineStore('user', () => {
  const user = ref<SharedUser | null>(null)

  const isUserAuth = computed(() => user.value !== null)
  const role = computed(() => user.value?.role ?? null)

  const setSession = (session: AuthResponse): void => {
    http.setToken(session.accessToken)
    user.value = session.user
  }

  const clearSession = (): void => {
    http.clearToken()
    user.value = null
  }

  const restoreSession = async (): Promise<boolean> => {
    const response = await refresh()

    if (!response.ok) {
      clearSession()
      return false
    }

    setSession(response.data)
    return true
  }

  let initPromise: Promise<boolean> | null = null
  const ensureInitialized = (): Promise<boolean> => (initPromise ??= restoreSession())

  return { user, isUserAuth, role, setSession, clearSession, restoreSession, ensureInitialized }
})
