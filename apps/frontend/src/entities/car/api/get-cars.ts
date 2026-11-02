import { http } from '@/shared/api'
import type { SharedCar } from '@driving-school/shared'

export const getCars = () =>
  http.fetchFull<SharedCar[]>({
    url: '/cars',
    method: 'GET',
  })
