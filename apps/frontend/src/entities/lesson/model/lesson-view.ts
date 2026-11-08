import { LessonStatus, LessonType } from '@driving-school/shared'
import type { SharedLesson } from '@driving-school/shared'

export type LessonState = 'planned' | 'held' | 'cancelled'
export type LessonPerspective = 'admin' | 'student' | 'instructor'

export const LESSON_STATE_LABEL: Record<LessonState, string> = {
  planned: 'Planned',
  held: 'Held',
  cancelled: 'Cancelled',
}

export const LESSON_TYPE_LABEL: Record<LessonType, string> = {
  [LessonType.THEORY]: 'Theory',
  [LessonType.PRACTICE]: 'Practice',
}

export const getLessonState = (lesson: SharedLesson): LessonState => {
  if (lesson.status === LessonStatus.CANCELLED) return 'cancelled'

  const now = new Date()
  const today = now.toLocaleDateString('sv-SE')
  const time = now.toTimeString().slice(0, 5)
  const isPast = lesson.date < today || (lesson.date === today && lesson.endTime <= time)

  return isPast ? 'held' : 'planned'
}

export const isLessonCancellable = (lesson: SharedLesson): boolean =>
  getLessonState(lesson) === 'planned'

export const isLessonEditable = (lesson: SharedLesson): boolean =>
  lesson.type === LessonType.PRACTICE && getLessonState(lesson) === 'planned'

export const formatLessonDate = (value: string): string =>
  new Date(`${value}T00:00:00`).toLocaleDateString('uk-UA', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

export const getLessonCounterpart = (
  lesson: SharedLesson,
  perspective: LessonPerspective,
): string => {
  if (perspective === 'student') return lesson.instructor.fullName
  if (lesson.type === LessonType.THEORY) return lesson.group?.name ?? '—'
  return lesson.student?.fullName ?? '—'
}