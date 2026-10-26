import { ref } from 'vue'
import { categorySchema } from '@driving-school/shared'
import { useCategoryStore, toCategoryPayloadInput } from '@/entities/category'
import type { CategoryFormErrors, CategoryFormValues } from '@/entities/category'
import { issuesToFieldErrors } from '@/shared/lib'

export const useEditCategory = (id: number, onSuccess: () => void) => {
  const categoryStore = useCategoryStore()

  const errors = ref<CategoryFormErrors>({})
  const serverError = ref<string | null>(null)
  const isLoading = ref(false)

  const submit = async (values: CategoryFormValues): Promise<void> => {
    const parsed = categorySchema.safeParse(toCategoryPayloadInput(values))
    if (!parsed.success) {
      errors.value = issuesToFieldErrors<keyof CategoryFormValues>(parsed.error.issues)
      return
    }

    errors.value = {}
    serverError.value = null
    isLoading.value = true
    const response = await categoryStore.update(id, parsed.data)
    isLoading.value = false

    if (!response.ok) {
      serverError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    onSuccess()
  }

  return { errors, serverError, isLoading, submit }
}
