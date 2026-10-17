import type { Role } from '@driving-school/shared'

declare module 'vue-router' {
  interface RouteMeta {
    roles?: readonly Role[]
  }
}
