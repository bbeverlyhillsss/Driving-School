import { LessonStatus, LessonType } from '@driving-school/shared'
import type { SharedLesson } from '@driving-school/shared'

export type LessonState = 'planned' | 'held' | 'cancelled'

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