import { http } from '@/shared/api'
import type { CarPayload, SharedCar } from '@driving-school/shared'

export const updateCar = (id: number, payload: CarPayload) =>
  http.fetchFull<SharedCar>({
    url: `/cars/${id}`,
    method: 'PUT',
    data: payload,
  })
