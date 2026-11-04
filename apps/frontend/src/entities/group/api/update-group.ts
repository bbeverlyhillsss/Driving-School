import { http } from '@/shared/api'
import type { GroupPayload, SharedGroup } from '@driving-school/shared'

export const updateGroup = (id: number, payload: GroupPayload) =>
  http.fetchFull<SharedGroup>({
    url: `/groups/${id}`,
    method: 'PUT',
    data: payload,
  })