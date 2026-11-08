import type { GroupShift } from '../types/group'

export const THEORY_LESSONS_COUNT = 20

export const THEORY_TIME: Record<GroupShift, { start: string; end: string }> = {
  MORNING: { start: '09:00', end: '12:00' },
  EVENING: { start: '18:00', end: '21:00' },
}

export const PRACTICE_START_TIMES = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
] as const

export const getPracticeEndTime = (startTime: string): string =>
  `${String(Number(startTime.slice(0, 2)) + 1).padStart(2, '0')}:00`