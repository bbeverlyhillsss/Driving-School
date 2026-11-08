import { ref } from 'vue'
import { examUpdateSchema } from '@driving-school/shared'
import { toExamUpdateInput, useExamStore } from '@/entities/exam'
import type { ExamFormErrors, ExamFormValues } from '@/entities/exam'
import { issuesToFieldErrors } from '@/shared/lib'

export const useEditExam = (studentId: number, date: string, onSuccess: () => void) => {
  const examStore = useExamStore()

  const errors = ref<ExamFormErrors>({})
  const serverError = ref<string | null>(null)
  const isLoading = ref(false)

  const submit = async (values: ExamFormValues): Promise<void> => {
    const parsed = examUpdateSchema.safeParse(toExamUpdateInput(values))
    if (!parsed.success) {
      errors.value = issuesToFieldErrors<keyof ExamFormValues>(parsed.error.issues)
      return
    }

    errors.value = {}
    serverError.value = null
    isLoading.value = true
    const response = await examStore.update(studentId, date, parsed.data)
    isLoading.value = false

    if (!response.ok) {
      serverError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    onSuccess()
  }

  return { errors, serverError, isLoading, submit }
}