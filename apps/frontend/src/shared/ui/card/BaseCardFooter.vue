<template>
  <div :class="classes"><slot /></div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/shared/lib'

const props = withDefaults(
  defineProps<{ direction?: 'row' | 'column'; class?: HTMLAttributes['class'] }>(),
  { direction: 'row' },
)

const classes = computed(() =>
  cn(
    'gap-3 text-sm text-zinc-400',
    props.direction === 'row' ? 'flex items-center' : 'flex flex-col',
    props.class,
  ),
)
</script>