import { http } from '@/shared/api'

export const removeGroupMember = (groupId: number, studentId: number) =>
  http.fetchFull<void>({
    url: `/groups/${groupId}/students/${studentId}`,
    method: 'DELETE',
  })