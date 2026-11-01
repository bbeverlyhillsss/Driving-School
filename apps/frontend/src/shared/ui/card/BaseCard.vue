<template>
  <div :class="classes"><slot /></div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn, provideSurface } from '@/shared/lib'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

provideSurface('dark')

const classes = computed(() =>
  cn(
    'flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-100',
    props.class,
  ),
)
</script>
