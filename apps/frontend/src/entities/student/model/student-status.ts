import { StudentStatus } from '@driving-school/shared'

export const STUDENT_STATUS_LABEL: Record<StudentStatus, string> = {
  [StudentStatus.ACTIVE]: 'Active',
  [StudentStatus.GRADUATED]: 'Graduated',
  [StudentStatus.EXPELLED]: 'Expelled',
}

export const STUDENT_STATUS_OPTIONS = Object.values(StudentStatus).map((value) => ({
  value,
  label: STUDENT_STATUS_LABEL[value],
}))