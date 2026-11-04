import { http } from '@/shared/api'
import type { GroupPayload, SharedGroup } from '@driving-school/shared'

export const createGroup = (payload: GroupPayload) =>
  http.fetchFull<SharedGroup>({
    url: '/groups',
    method: 'POST',
    data: payload,
  })