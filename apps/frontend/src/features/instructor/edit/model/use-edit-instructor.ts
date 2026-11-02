import { ref } from 'vue'
import { instructorUpdateSchema } from '@driving-school/shared'
import { useInstructorStore, toInstructorUpdateInput } from '@/entities/instructor'
import type { InstructorFormErrors, InstructorFormValues } from '@/entities/instructor'
import { issuesToFieldErrors } from '@/shared/lib'

export const useEditInstructor = (id: number, onSuccess: () => void) => {
  const instructorStore = useInstructorStore()

  const errors = ref<InstructorFormErrors>({})
  const serverError = ref<string | null>(null)
  const isLoading = ref(false)

  const submit = async (values: InstructorFormValues): Promise<void> => {
    const parsed = instructorUpdateSchema.safeParse(toInstructorUpdateInput(values))
    if (!parsed.success) {
      errors.value = issuesToFieldErrors<keyof InstructorFormValues>(parsed.error.issues)
      return
    }

    errors.value = {}
    serverError.value = null
    isLoading.value = true
    const response = await instructorStore.update(id, parsed.data)
    isLoading.value = false

    if (!response.ok) {
      serverError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    onSuccess()
  }

  return { errors, serverError, isLoading, submit }
}