import type { SharedLesson } from './lesson'

export interface SharedOverview {
  counts: {
    activeStudents: number
    totalStudents: number
    activeGroups: number
    instructors: number
    cars: number
    lessonsToday: number
    paidThisMonth: number
  }
  attention: {
    studentsWithoutGroup: number
    carsInspectionExpired: number
    carsInspectionExpiringSoon: number
    groupsWithoutSchedule: number
    examsAwaitingResult: number
    pendingPayments: number
  }
  todayLessons: SharedLesson[]
}