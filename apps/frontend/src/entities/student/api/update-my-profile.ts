import { http } from '@/shared/api'
import type { SharedStudent, StudentSelfPayload } from '@driving-school/shared'

export const updateMyProfile = (payload: StudentSelfPayload) =>
  http.fetchFull<SharedStudent>({
    url: '/students/me',
    method: 'PUT',
    data: payload,
  })