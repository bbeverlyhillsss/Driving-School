import { http } from '@/shared/api'
import type { AddGroupStudentPayload, SharedGroupMember } from '@driving-school/shared'

export const addGroupMember = (groupId: number, payload: AddGroupStudentPayload) =>
  http.fetchFull<SharedGroupMember>({
    url: `/groups/${groupId}/students`,
    method: 'POST',
    data: payload,
  })