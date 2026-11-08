import { LessonType } from '@driving-school/shared'
import type { SharedLesson } from '@driving-school/shared'
import { getLessonState } from './lesson-view'

export interface LessonProgress {
  held: number
  planned: number
}

const countByType = (lessons: SharedLesson[], type: LessonType): LessonProgress => {
  const progress: LessonProgress = { held: 0, planned: 0 }

  for (const lesson of lessons) {
    if (lesson.type !== type) continue

    const state = getLessonState(lesson)
    if (state === 'held') progress.held += 1
    if (state === 'planned') progress.planned += 1
  }

  return progress
}

export const getTheoryProgress = (lessons: SharedLesson[]): LessonProgress =>
  countByType(lessons, LessonType.THEORY)

export const getPracticeProgress = (lessons: SharedLesson[]): LessonProgress =>
  countByType(lessons, LessonType.PRACTICE)