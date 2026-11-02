import { ref } from 'vue'
import { carSchema } from '@driving-school/shared'
import { useCarStore, toCarPayloadInput } from '@/entities/car'
import type { CarFormErrors, CarFormValues } from '@/entities/car'
import { issuesToFieldErrors } from '@/shared/lib'

export const useCreateCar = (onSuccess: () => void) => {
  const carStore = useCarStore()

  const errors = ref<CarFormErrors>({})
  const serverError = ref<string | null>(null)
  const isLoading = ref(false)

  const reset = (): void => {
    errors.value = {}
    serverError.value = null
  }

  const submit = async (values: CarFormValues): Promise<void> => {
    const parsed = carSchema.safeParse(toCarPayloadInput(values))
    if (!parsed.success) {
      errors.value = issuesToFieldErrors<keyof CarFormValues>(parsed.error.issues)
      return
    }

    reset()
    isLoading.value = true
    const response = await carStore.create(parsed.data)
    isLoading.value = false

    if (!response.ok) {
      serverError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    onSuccess()
  }

  return { errors, serverError, isLoading, submit, reset }
}