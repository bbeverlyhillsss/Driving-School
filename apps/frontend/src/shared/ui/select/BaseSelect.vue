<template>
  <div class="relative">
    <select v-model="model" :aria-invalid="invalid || undefined" :class="classes" v-bind="$attrs">
      <slot />
    </select>
    <ChevronDown
      :size="16"
      :class="['pointer-events-none absolute top-1/2 right-3 -translate-y-1/2', iconClass]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn, useSurface } from '@/shared/lib'
import type { Surface } from '@/shared/lib'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{ invalid?: boolean }>(), { invalid: false })

const model = defineModel<string>({ default: '' })

const surface: Surface = useSurface()

const base =
  'h-10 w-full cursor-pointer appearance-none rounded-lg border pr-9 pl-3 text-sm outline-none transition-colors focus:ring-2 disabled:cursor-not-allowed'

const styles: Record<Surface, Record<'field' | 'normal' | 'invalid', string>> = {
  light: {
    field: 'bg-white text-zinc-900 disabled:bg-zinc-100 disabled:text-zinc-500',
    normal: 'border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/15',
    invalid: 'border-red-600 focus:border-red-600 focus:ring-red-600/20',
  },
  dark: {
    field:
      'bg-zinc-800 text-zinc-50 [color-scheme:dark] disabled:bg-zinc-800/50 disabled:text-zinc-500',
    normal: 'border-zinc-700 focus:border-zinc-300 focus:ring-zinc-300/20',
    invalid: 'border-red-400 focus:border-red-400 focus:ring-red-400/25',
  },
}

const classes = computed(() =>
  cn(base, styles[surface].field, styles[surface][props.invalid ? 'invalid' : 'normal']),
)

const iconClass = surface === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
</script>