<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-baseline justify-between gap-3 text-sm">
      <span :class="['font-medium', colors.label]">{{ label }}</span>
      <span :class="colors.value">{{ summary }}</span>
    </div>
    <div
      role="progressbar"
      :aria-label="label"
      aria-valuemin="0"
      :aria-valuemax="max"
      :aria-valuenow="value"
      :class="['flex h-2 overflow-hidden rounded-full', colors.track]"
    >
      <div :class="['h-full', colors.fill]" :style="{ width: `${valuePercent}%` }" />
      <div :class="['h-full', colors.extra]" :style="{ width: `${extraPercent}%` }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSurface } from '@/shared/lib'
import type { Surface } from '@/shared/lib'

const props = withDefaults(
  defineProps<{ label: string; value: number; extra?: number; max: number }>(),
  { extra: 0 },
)

const surface: Surface = useSurface()

const palette: Record<Surface, Record<'label' | 'value' | 'track' | 'fill' | 'extra', string>> = {
  light: {
    label: 'text-zinc-700',
    value: 'text-zinc-500',
    track: 'bg-zinc-200',
    fill: 'bg-zinc-900',
    extra: 'bg-zinc-400',
  },
  dark: {
    label: 'text-zinc-300',
    value: 'text-zinc-400',
    track: 'bg-zinc-800',
    fill: 'bg-zinc-100',
    extra: 'bg-zinc-500',
  },
}

const colors = palette[surface]

const percent = (part: number): number => (props.max > 0 ? (part / props.max) * 100 : 0)

const valuePercent = computed(() => Math.min(100, percent(props.value)))
const extraPercent = computed(() => Math.min(100 - valuePercent.value, percent(props.extra)))

const summary = computed(() =>
  props.extra > 0
    ? `${props.value} of ${props.max} · ${props.extra} planned`
    : `${props.value} of ${props.max}`,
)
</script>
