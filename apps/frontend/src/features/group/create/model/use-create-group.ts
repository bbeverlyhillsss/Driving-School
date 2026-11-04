import { ref } from 'vue'
import { groupSchema } from '@driving-school/shared'
import { useGroupStore, toGroupPayloadInput } from '@/entities/group'
import type { GroupFormErrors, GroupFormValues } from '@/entities/group'
import { issuesToFieldErrors } from '@/shared/lib'

export const useCreateGroup = (onSuccess: () => void) => {
  const groupStore = useGroupStore()

  const errors = ref<GroupFormErrors>({})
  const serverError = ref<string | null>(null)
  const isLoading = ref(false)

  const reset = (): void => {
    errors.value = {}
    serverError.value = null
  }

  const submit = async (values: GroupFormValues): Promise<void> => {
    const parsed = groupSchema.safeParse(toGroupPayloadInput(values))
    if (!parsed.success) {
      errors.value = issuesToFieldErrors<keyof GroupFormValues>(parsed.error.issues)
      return
    }

    reset()
    isLoading.value = true
    const response = await groupStore.create(parsed.data)
    isLoading.value = false

    if (!response.ok) {
      serverError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    onSuccess()
  }

  return { errors, serverError, isLoading, submit, reset }
}