import { ref } from 'vue'
import { studentSelfSchema } from '@driving-school/shared'
import { useStudentProfileStore, toStudentSelfInput } from '@/entities/student'
import type { StudentFormErrors, StudentFormValues } from '@/entities/student'
import { issuesToFieldErrors } from '@/shared/lib'

export const useEditProfile = () => {
  const profileStore = useStudentProfileStore()

  const errors = ref<StudentFormErrors>({})
  const serverError = ref<string | null>(null)
  const isLoading = ref(false)
  const isSaved = ref(false)

  const submit = async (values: StudentFormValues): Promise<void> => {
    isSaved.value = false

    const parsed = studentSelfSchema.safeParse(toStudentSelfInput(values))
    if (!parsed.success) {
      errors.value = issuesToFieldErrors<keyof StudentFormValues>(parsed.error.issues)
      return
    }

    errors.value = {}
    serverError.value = null
    isLoading.value = true
    const response = await profileStore.update(parsed.data)
    isLoading.value = false

    if (!response.ok) {
      serverError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    isSaved.value = true
  }

  return { errors, serverError, isLoading, isSaved, submit }
}