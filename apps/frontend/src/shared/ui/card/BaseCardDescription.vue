<template>
  <p :class="classes"><slot /></p>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/shared/lib'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const classes = computed(() => cn('text-sm text-zinc-400', props.class))
</script>