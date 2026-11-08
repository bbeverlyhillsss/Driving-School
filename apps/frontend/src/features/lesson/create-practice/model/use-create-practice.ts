import { ref } from 'vue'
import { practiceLessonSchema } from '@driving-school/shared'
import { toPracticeLessonInput, useLessonStore } from '@/entities/lesson'
import type { PracticeFormErrors, PracticeFormValues } from '@/entities/lesson'
import { issuesToFieldErrors } from '@/shared/lib'

export const useCreatePractice = (onSuccess: () => void) => {
  const lessonStore = useLessonStore()

  const errors = ref<PracticeFormErrors>({})
  const serverError = ref<string | null>(null)
  const isLoading = ref(false)

  const reset = (): void => {
    errors.value = {}
    serverError.value = null
  }

  const submit = async (values: PracticeFormValues): Promise<void> => {
    const parsed = practiceLessonSchema.safeParse(toPracticeLessonInput(values))
    if (!parsed.success) {
      errors.value = issuesToFieldErrors<keyof PracticeFormValues>(parsed.error.issues)
      return
    }

    reset()
    isLoading.value = true
    const response = await lessonStore.createPractice(parsed.data)
    isLoading.value = false

    if (!response.ok) {
      serverError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    onSuccess()
  }

  return { errors, serverError, isLoading, submit, reset }
}
