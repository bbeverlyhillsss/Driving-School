import { ref } from 'vue'
import { registerSchema } from '@driving-school/shared/src/schemas/auth.schema'
import type { RegisterPayload } from '@driving-school/shared'
import { http } from '@/shared/api'
import { register } from '../api/register'

export const useRegister = (onSuccess: () => void) => {
  const form = ref<RegisterPayload>({ email: '', password: '', fullName: '' })
  const isLoading = ref(false)
  const errors = ref<string[]>([])

  const submit = async (): Promise<void> => {
    const parsed = registerSchema.safeParse(form.value)
    if (!parsed.success) {
      errors.value = parsed.error.issues.map((issue) => issue.message)
      return
    }

    errors.value = []
    isLoading.value = true
    const response = await register(parsed.data)
    isLoading.value = false

    if (!response.ok) {
      const details = response.error?.errors?.map(String) ?? []
      errors.value = details.length ? details : [response.error?.message ?? 'Server is unavailable']
      return
    }

    http.setToken(response.data.accessToken)
    onSuccess()
  }

  return { form, isLoading, errors, submit }
}
