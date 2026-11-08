import { ref } from 'vue'
import { practiceLessonSchema } from '@driving-school/shared'
import { toPracticeLessonInput, useLessonStore } from '@/entities/lesson'
import type { PracticeFormErrors, PracticeFormValues } from '@/entities/lesson'
import { issuesToFieldErrors } from '@/shared/lib'

export const useEditPractice = (id: number, onSuccess: () => void) => {
  const lessonStore = useLessonStore()

  const errors = ref<PracticeFormErrors>({})
  const serverError = ref<string | null>(null)
  const isLoading = ref(false)

  const submit = async (values: PracticeFormValues): Promise<void> => {
    const parsed = practiceLessonSchema.safeParse(toPracticeLessonInput(values))
    if (!parsed.success) {
      errors.value = issuesToFieldErrors<keyof PracticeFormValues>(parsed.error.issues)
      return
    }

    errors.value = {}
    serverError.value = null
    isLoading.value = true
    const response = await lessonStore.updatePractice(id, parsed.data)
    isLoading.value = false

    if (!response.ok) {
      serverError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    onSuccess()
  }

  return { errors, serverError, isLoading, submit }
}