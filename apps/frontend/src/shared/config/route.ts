import type { RouteLocationRaw } from 'vue-router'

// const ROOT_ROUTE_NAME = 'root'

// export const ROOT_LINK = {
//   name: ROOT_ROUTE_NAME,
// } as const satisfies RouteLocationRaw

// const LOGIN_ROUTE_NAME = 'login'

// export const LOGIN_LINK = {
//   name: LOGIN_ROUTE_NAME,
// } as const satisfies RouteLocationRaw

export const ROOT_LINK = { name: 'root' } as const satisfies RouteLocationRaw
export const LOGIN_LINK = { name: 'login' } as const satisfies RouteLocationRaw
export const CATEGORIES_LINK = { name: 'categories' } as const satisfies RouteLocationRaw
export const CARS_LINK = { name: 'cars' } as const satisfies RouteLocationRaw
export const INSTRUCTORS_LINK = { name: 'instructors' } as const satisfies RouteLocationRaw
export const GROUPS_LINK = { name: 'groups' } as const satisfies RouteLocationRaw
export const STUDENTS_LINK = { name: 'students' } as const satisfies RouteLocationRaw
export const LESSONS_LINK = { name: 'lessons' } as const satisfies RouteLocationRaw
export const EXAMS_LINK = { name: 'exams' } as const satisfies RouteLocationRaw
export const PAYMENTS_LINK = { name: 'payments' } as const satisfies RouteLocationRaw