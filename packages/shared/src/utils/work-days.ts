import { THEORY_LESSONS_COUNT } from '../constants/schedule'

const toUtcDate = (value: string): Date => new Date(`${value}T00:00:00Z`)

export const isWorkingDay = (value: string): boolean => {
  const day = toUtcDate(value).getUTCDay()
  return day !== 0 && day !== 6
}

export const getWorkingDays = (startDate: string, count: number): string[] => {
  const days: string[] = []
  const cursor = toUtcDate(startDate)

  while (days.length < count) {
    const value = cursor.toISOString().slice(0, 10)
    if (isWorkingDay(value)) days.push(value)
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }

  return days
}

export const getGroupEndDate = (startDate: string): string => {
  const days = getWorkingDays(startDate, THEORY_LESSONS_COUNT)
  return days[days.length - 1] as string
}