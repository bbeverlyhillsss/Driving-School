import type { SharedLesson } from '@driving-school/shared'

export interface PracticeFormValues {
  studentId: string
  instructorId: string
  carId: string
  date: string
  startTime: string
}

export type PracticeFormErrors = Partial<Record<keyof PracticeFormValues, string>>

export const createEmptyPracticeForm = (): PracticeFormValues => ({
  studentId: '',
  instructorId: '',
  carId: '',
  date: '',
  startTime: '',
})

export const toPracticeFormValues = (lesson: SharedLesson): PracticeFormValues => ({
  studentId: lesson.student ? String(lesson.student.id) : '',
  instructorId: String(lesson.instructor.id),
  carId: lesson.car ? String(lesson.car.id) : '',
  date: lesson.date,
  startTime: lesson.startTime,
})

const toNumber = (value: string): number | undefined => {
  const trimmed = value.trim()
  return trimmed === '' ? undefined : Number(trimmed)
}

export const toPracticeLessonInput = (values: PracticeFormValues) => ({
  studentId: toNumber(values.studentId),
  instructorId: toNumber(values.instructorId),
  carId: toNumber(values.carId),
  date: values.date,
  startTime: values.startTime,
})