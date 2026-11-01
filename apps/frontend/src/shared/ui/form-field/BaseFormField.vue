<template>
  <div class="flex flex-col gap-1.5">
    <label :for="id" :class="['text-sm font-medium', labelClass]">{{ label }}</label>
    <slot :id="id" :invalid="!!error" />
    <p v-if="error" :class="['text-sm', errorClass]">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import { useSurface } from '@/shared/lib'

defineProps<{ label: string; error?: string }>()

const id = useId()
const isDark = useSurface() === 'dark'

const labelClass = isDark ? 'text-zinc-200' : 'text-zinc-800'
const errorClass = isDark ? 'text-red-400' : 'text-red-600'
</script>
