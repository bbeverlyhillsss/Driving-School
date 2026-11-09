import { ref } from 'vue'
import { paymentSchema } from '@driving-school/shared'
import { toPaymentPayloadInput, usePaymentStore } from '@/entities/payment'
import type { PaymentFormErrors, PaymentFormValues } from '@/entities/payment'
import { issuesToFieldErrors } from '@/shared/lib'

export const useCreatePayment = (onSuccess: () => void) => {
  const paymentStore = usePaymentStore()

  const errors = ref<PaymentFormErrors>({})
  const serverError = ref<string | null>(null)
  const isLoading = ref(false)

  const reset = (): void => {
    errors.value = {}
    serverError.value = null
  }

  const submit = async (values: PaymentFormValues): Promise<void> => {
    const parsed = paymentSchema.safeParse(toPaymentPayloadInput(values))
    if (!parsed.success) {
      errors.value = issuesToFieldErrors<keyof PaymentFormValues>(parsed.error.issues)
      return
    }

    reset()
    isLoading.value = true
    const response = await paymentStore.create(parsed.data)
    isLoading.value = false

    if (!response.ok) {
      serverError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    onSuccess()
  }

  return { errors, serverError, isLoading, submit, reset }
}