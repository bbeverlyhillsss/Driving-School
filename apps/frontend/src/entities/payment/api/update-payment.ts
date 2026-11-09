import { http } from '@/shared/api'
import type { PaymentPayload, SharedPayment } from '@driving-school/shared'

export const updatePayment = (id: number, payload: PaymentPayload) =>
  http.fetchFull<SharedPayment>({
    url: `/payments/${id}`,
    method: 'PUT',
    data: payload,
  })