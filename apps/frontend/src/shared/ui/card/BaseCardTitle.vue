<template>
  <component :is="as" :class="classes"><slot /></component>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/shared/lib'

const props = withDefaults(
  defineProps<{ as?: 'h1' | 'h2' | 'h3'; class?: HTMLAttributes['class'] }>(),
  { as: 'h2' },
)

const classes = computed(() => cn('text-xl font-semibold tracking-tight text-zinc-50', props.class))
</script>