import { ExamResult, LessonType } from '@driving-school/shared'
import type { SharedExam } from '@driving-school/shared'

export type ExamStatus = 'passed' | 'failed' | 'scheduled' | 'none'

export const EXAM_TYPE_LABEL: Record<LessonType, string> = {
  [LessonType.THEORY]: 'Theory',
  [LessonType.PRACTICE]: 'Practice',
}

export const EXAM_TYPE_OPTIONS = Object.values(LessonType).map((value) => ({
  value,
  label: EXAM_TYPE_LABEL[value],
}))

export const EXAM_RESULT_LABEL: Record<ExamResult, string> = {
  [ExamResult.PASSED]: 'Passed',
  [ExamResult.FAILED]: 'Failed',
}

export const EXAM_RESULT_OPTIONS = Object.values(ExamResult).map((value) => ({
  value,
  label: EXAM_RESULT_LABEL[value],
}))

export const EXAM_STATUS_LABEL: Record<ExamStatus, string> = {
  passed: 'Passed',
  failed: 'Failed, a retake is needed',
  scheduled: 'Scheduled, no result yet',
  none: 'Not taken yet',
}

export const getExamKey = (exam: SharedExam): string => `${exam.studentId}_${exam.date}`

export const formatExamDate = (value: string): string =>
  new Date(`${value}T00:00:00`).toLocaleDateString('uk-UA')

export const getExamStatus = (exams: SharedExam[], type: LessonType): ExamStatus => {
  const attempts = exams
    .filter((exam) => exam.type === type)
    .sort((a, b) => a.date.localeCompare(b.date))

  if (attempts.some((exam) => exam.result === ExamResult.PASSED)) return 'passed'

  const last = attempts[attempts.length - 1]
  if (!last) return 'none'

  return last.result === null ? 'scheduled' : 'failed'
}