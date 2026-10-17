<template>
  <input
    v-model="model"
    :type="type"
    :aria-invalid="invalid || undefined"
    :class="
      cn(
        base,
        invalid
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
          : 'border-gray-300 focus:border-blue-600 focus:ring-blue-600/30',
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
  'h-10 w-full rounded-md border bg-white px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60'
</script>
