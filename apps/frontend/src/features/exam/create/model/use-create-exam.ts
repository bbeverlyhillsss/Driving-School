import { ref } from 'vue'
import { examSchema } from '@driving-school/shared'
import { toExamCreateInput, useExamStore } from '@/entities/exam'
import type { ExamFormErrors, ExamFormValues } from '@/entities/exam'
import { issuesToFieldErrors } from '@/shared/lib'

export const useCreateExam = (onSuccess: () => void) => {
  const examStore = useExamStore()

  const errors = ref<ExamFormErrors>({})
  const serverError = ref<string | null>(null)
  const isLoading = ref(false)

  const reset = (): void => {
    errors.value = {}
    serverError.value = null
  }

  const submit = async (values: ExamFormValues): Promise<void> => {
    const parsed = examSchema.safeParse(toExamCreateInput(values))
    if (!parsed.success) {
      errors.value = issuesToFieldErrors<keyof ExamFormValues>(parsed.error.issues)
      return
    }

    reset()
    isLoading.value = true
    const response = await examStore.create(parsed.data)
    isLoading.value = false

    if (!response.ok) {
      serverError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    onSuccess()
  }

  return { errors, serverError, isLoading, submit, reset }
}