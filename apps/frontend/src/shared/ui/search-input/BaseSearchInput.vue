<template>
  <div class="relative">
    <Search
      :size="16"
      class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
    />
    <BaseInput v-model="model" type="search" :placeholder :aria-label="placeholder" class="pl-9" />
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { BaseInput } from '@/shared/ui/input'

withDefaults(defineProps<{ placeholder?: string }>(), { placeholder: 'Search' })

const model = defineModel<string>({ default: '' })
</script>