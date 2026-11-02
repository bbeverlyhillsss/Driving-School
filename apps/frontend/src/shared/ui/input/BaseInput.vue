<template>
  <input v-model="model" :type :aria-invalid="invalid || undefined" :class="classes" />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn, useSurface } from '@/shared/lib'
import type { Surface } from '@/shared/lib'

interface Props {
  type?: string
  invalid?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  invalid: false,
})

const model = defineModel<string>({ default: '' })

const surface = useSurface()

const base =
  'h-10 w-full rounded-lg border px-3 text-sm outline-none transition-colors focus:ring-2 disabled:cursor-not-allowed'

const styles: Record<Surface, Record<'field' | 'normal' | 'invalid', string>> = {
  light: {
    field:
      'bg-white text-zinc-900 placeholder:text-zinc-400 disabled:bg-zinc-100 disabled:text-zinc-500',
    normal: 'border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/15',
    invalid: 'border-red-600 focus:border-red-600 focus:ring-red-600/20',
  },
  dark: {
    field:
      'bg-zinc-800 text-zinc-50 [color-scheme:dark] placeholder:text-zinc-500 disabled:bg-zinc-800/50 disabled:text-zinc-500',
    normal: 'border-zinc-700 focus:border-zinc-300 focus:ring-zinc-300/20',
    invalid: 'border-red-400 focus:border-red-400 focus:ring-red-400/25',
  },
}

const classes = computed(() =>
  cn(
    base,
    styles[surface].field,
    styles[surface][props.invalid ? 'invalid' : 'normal'],
    props.class,
  ),
)
</script>
