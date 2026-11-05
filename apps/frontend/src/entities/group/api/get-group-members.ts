import { http } from '@/shared/api'
import type { SharedGroupMember } from '@driving-school/shared'

export const getGroupMembers = (groupId: number) =>
  http.fetchFull<SharedGroupMember[]>({
    url: `/groups/${groupId}/students`,
    method: 'GET',
  })