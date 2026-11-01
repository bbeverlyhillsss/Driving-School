<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-label="label"
    :title="label"
    :class="classes"
  >
    <span
      v-if="loading"
      class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/shared/lib'

type Tone = 'neutral' | 'danger'

interface Props {
  label: string
  tone?: Tone
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'neutral',
  type: 'button',
  loading: false,
  disabled: false,
})

const base =
  'inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50'

const tones: Record<Tone, string> = {
  neutral: 'hover:bg-zinc-200 hover:text-zinc-900 focus-visible:outline-zinc-900',
  danger: 'hover:bg-red-100 hover:text-red-700 focus-visible:outline-red-700',
}

const classes = computed(() => cn(base, tones[props.tone], props.class))
</script>
