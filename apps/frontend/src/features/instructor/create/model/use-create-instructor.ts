import { ref } from 'vue'
import { instructorSchema } from '@driving-school/shared'
import { useInstructorStore, toInstructorCreateInput } from '@/entities/instructor'
import type { InstructorFormErrors, InstructorFormValues } from '@/entities/instructor'
import { issuesToFieldErrors } from '@/shared/lib'

export const useCreateInstructor = (onSuccess: () => void) => {
  const instructorStore = useInstructorStore()

  const errors = ref<InstructorFormErrors>({})
  const serverError = ref<string | null>(null)
  const isLoading = ref(false)

  const reset = (): void => {
    errors.value = {}
    serverError.value = null
  }

  const submit = async (values: InstructorFormValues): Promise<void> => {
    const parsed = instructorSchema.safeParse(toInstructorCreateInput(values))
    if (!parsed.success) {
      errors.value = issuesToFieldErrors<keyof InstructorFormValues>(parsed.error.issues)
      return
    }

    reset()
    isLoading.value = true
    const response = await instructorStore.create(parsed.data)
    isLoading.value = false

    if (!response.ok) {
      serverError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    onSuccess()
  }

  return { errors, serverError, isLoading, submit, reset }
}