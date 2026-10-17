<template>
  <div class="flex flex-col gap-1.5">
    <label :for="id" class="text-sm font-medium text-gray-700">{{ label }}</label>
    <slot :id="id" :invalid="!!error" />
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

defineProps<{ label: string; error?: string }>()

const id = useId()
</script>
