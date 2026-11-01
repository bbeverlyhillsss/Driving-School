import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

export type Surface = 'light' | 'dark'

const SURFACE_KEY: InjectionKey<Surface> = Symbol('surface')

export const provideSurface = (surface: Surface): void => provide(SURFACE_KEY, surface)

export const useSurface = (): Surface => inject(SURFACE_KEY, 'light')
