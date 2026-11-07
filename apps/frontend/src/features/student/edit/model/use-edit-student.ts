import { ref } from 'vue'
import { studentUpdateSchema } from '@driving-school/shared'
import { useStudentStore, toStudentUpdateInput } from '@/entities/student'
import type { StudentFormErrors, StudentFormValues } from '@/entities/student'
import { issuesToFieldErrors } from '@/shared/lib'

export const useEditStudent = (id: number, onSuccess: () => void) => {
  const studentStore = useStudentStore()

  const errors = ref<StudentFormErrors>({})
  const serverError = ref<string | null>(null)
  const isLoading = ref(false)

  const submit = async (values: StudentFormValues): Promise<void> => {
    const parsed = studentUpdateSchema.safeParse(toStudentUpdateInput(values))
    if (!parsed.success) {
      errors.value = issuesToFieldErrors<keyof StudentFormValues>(parsed.error.issues)
      return
    }

    errors.value = {}
    serverError.value = null
    isLoading.value = true
    const response = await studentStore.update(id, parsed.data)
    isLoading.value = false

    if (!response.ok) {
      serverError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    onSuccess()
  }

  return { errors, serverError, isLoading, submit }
}