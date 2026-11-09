import { http } from '@/shared/api'
import type { PaymentPayload, SharedPayment } from '@driving-school/shared'

export const createPayment = (payload: PaymentPayload) =>
  http.fetchFull<SharedPayment>({
    url: '/payments',
    method: 'POST',
    data: payload,
  })