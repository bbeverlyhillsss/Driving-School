import { computed, ref } from 'vue'
import { LessonStatus } from '@driving-school/shared'
import {
  formatLessonDate,
  getLessonCounterpart,
  getLessonState,
  LESSON_TYPE_LABEL,
  useLessonStore,
} from '@/entities/lesson'
import type { LessonPerspective } from '@/entities/lesson'

export type ScheduleTab = 'upcoming' | 'history'

export const SCHEDULE_TABS: { value: ScheduleTab; label: string }[] = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'history', label: 'History' },
]

export const useLessonSchedule = (perspective: LessonPerspective) => {
  const lessonStore = useLessonStore()
  const tab = ref<ScheduleTab>('upcoming')

  const upcoming = computed(() =>
    lessonStore.items.filter((lesson) => getLessonState(lesson) === 'planned'),
  )

  const history = computed(() =>
    lessonStore.items.filter((lesson) => getLessonState(lesson) !== 'planned').reverse(),
  )

  const visibleItems = computed(() => (tab.value === 'upcoming' ? upcoming.value : history.value))

  const todayCount = computed(() => {
    const today = new Date().toLocaleDateString('sv-SE')
    return lessonStore.items.filter(
      (lesson) => lesson.date === today && lesson.status !== LessonStatus.CANCELLED,
    ).length
  })

  const summary = computed(() => {
    const parts: string[] = []

    if (todayCount.value > 0) {
      parts.push(`Today: ${todayCount.value} ${todayCount.value === 1 ? 'lesson' : 'lessons'}`)
    }

    const next = upcoming.value[0]
    if (next) {
      parts.push(
        `Next: ${formatLessonDate(next.date)}, ${next.startTime}–${next.endTime} · ${LESSON_TYPE_LABEL[next.type]} · ${getLessonCounterpart(next, perspective)}`,
      )
    }

    return parts.join('. ')
  })

  return { tab, visibleItems, summary }
}