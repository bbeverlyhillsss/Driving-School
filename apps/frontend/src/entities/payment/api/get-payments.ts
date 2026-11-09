import { http } from '@/shared/api'
import type { SharedPayment } from '@driving-school/shared'

export const getPayments = () =>
  http.fetchFull<SharedPayment[]>({
    url: '/payments',
    method: 'GET',
  })