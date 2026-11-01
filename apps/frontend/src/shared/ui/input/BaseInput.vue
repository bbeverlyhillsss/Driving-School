<template>
  <input
    v-model="model"
    :type="type"
    :aria-invalid="invalid || undefined"
    :class="
      cn(
        base,
        invalid
          ? 'border-red-600 focus:border-red-600 focus:ring-red-600/20'
          : 'border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/15',
        props.class,
      )
    "
  />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/shared/lib'

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

const base =
  'h-10 w-full rounded-lg border bg-white px-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:ring-2 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500'
</script>
