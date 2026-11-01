<template>
  <div :class="classes"><slot /></div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/shared/lib'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const classes = computed(() => cn('flex flex-col gap-1.5', props.class))
</script>