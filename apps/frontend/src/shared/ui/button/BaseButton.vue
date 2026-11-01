<template>
  <button :type="type" :disabled="disabled || loading" :class="classes">
    <span
      v-if="loading"
      class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/shared/lib'

type Variant = 'primary' | 'secondary' | 'inverse'
type Size = 'sm' | 'md' | 'lg'

interface Props {
  variant?: Variant
  size?: Size
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  loading: false,
  disabled: false,
})

const base =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800 focus-visible:outline-zinc-900',
  secondary: 'bg-zinc-700 text-zinc-50 hover:bg-zinc-600 focus-visible:outline-zinc-700',
  inverse: 'bg-zinc-100 text-zinc-900 hover:bg-white focus-visible:outline-zinc-100',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

const classes = computed(() => cn(base, variants[props.variant], sizes[props.size], props.class))
</script>
