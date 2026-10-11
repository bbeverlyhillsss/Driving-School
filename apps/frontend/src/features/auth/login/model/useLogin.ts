import { ref } from 'vue'
import { loginSchema } from '@driving-school/shared'
import type { LoginPayload } from '@driving-school/shared'
import { login } from '../api'
import { useUserStore } from '@/entities/user/model'

export const useLogin = (onSuccess: () => void) => {
  const form = ref<LoginPayload>({ email: '', password: '' })
  const isLoading = ref(false)
  const errors = ref<string[]>([])

  const userStore = useUserStore()

  const submit = async (): Promise<void> => {
    const parsed = loginSchema.safeParse(form.value)
    if (!parsed.success) {
      errors.value = parsed.error.issues.map((issue) => issue.message)
      return
    }

    errors.value = []
    isLoading.value = true
    const response = await login(parsed.data)
    isLoading.value = false

    if (!response.ok) {
      const details = response.error?.errors?.map(String) ?? []
      errors.value = details.length ? details : [response.error?.message ?? 'Server is unavailable']
      return
    }

    userStore.setSession(response.data)
    onSuccess()
  }

  return { form, isLoading, errors, submit }
}
