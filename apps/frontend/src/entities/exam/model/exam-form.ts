import { LessonType } from '@driving-school/shared'
import type { SharedExam } from '@driving-school/shared'

export interface ExamFormValues {
  studentId: string
  type: string
  date: string
  result: string
  score: string
}

export type ExamFormErrors = Partial<Record<keyof ExamFormValues, string>>

export const createEmptyExamForm = (): ExamFormValues => ({
  studentId: '',
  type: LessonType.THEORY,
  date: '',
  result: '',
  score: '',
})

export const toExamFormValues = (exam: SharedExam): ExamFormValues => ({
  studentId: String(exam.studentId),
  type: exam.type,
  date: exam.date,
  result: exam.result ?? '',
  score: exam.score?.toString() ?? '',
})

const toNumber = (value: string): number | undefined => {
  const trimmed = value.trim()
  return trimmed === '' ? undefined : Number(trimmed)
}

export const toExamUpdateInput = (values: ExamFormValues) => ({
  result: values.result === '' ? null : values.result,
  score: toNumber(values.score) ?? null,
})

export const toExamCreateInput = (values: ExamFormValues) => ({
  ...toExamUpdateInput(values),
  studentId: toNumber(values.studentId),
  type: values.type,
  date: values.date,
})