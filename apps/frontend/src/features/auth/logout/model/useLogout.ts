import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/entities/user/'
import { LOGIN_LINK } from '@/shared/config'
import { logout } from '../api/logout'

export const useLogout = () => {
  const router = useRouter()
  const userStore = useUserStore()
  const isLoading = ref(false)

  const submit = async (): Promise<void> => {
    isLoading.value = true
    await logout()
    isLoading.value = false

    userStore.clearSession()
    await router.push(LOGIN_LINK)
  }

  return { isLoading, submit }
}
