import { http } from '@/shared/api'
import type { CarPayload, SharedCar } from '@driving-school/shared'

export const createCar = (payload: CarPayload) =>
  http.fetchFull<SharedCar>({
    url: '/cars',
    method: 'POST',
    data: payload,
  })
