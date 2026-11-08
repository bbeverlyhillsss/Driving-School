<template>
  <section class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 class="text-lg font-semibold text-zinc-900">Schedule</h2>

      <div
        role="tablist"
        aria-label="Schedule view"
        class="inline-flex rounded-lg border border-zinc-300 bg-white p-1"
      >
        <button
          v-for="option in SCHEDULE_TABS"
          :key="option.value"
          type="button"
          role="tab"
          :aria-selected="tab === option.value"
          :class="[tabBase, tab === option.value ? tabActive : tabIdle]"
          @click="tab = option.value"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <p v-if="summary" class="text-sm text-zinc-600">{{ summary }}</p>

    <p v-if="lessonStore.isLoading" class="text-zinc-600">Loading...</p>
    <p v-else-if="lessonStore.loadError" class="text-red-600">{{ lessonStore.loadError }}</p>
    <LessonTable v-else :items="visibleItems" :total="lessonStore.items.length" :perspective />
  </section>
</template>

<script setup lang="ts">
import { LessonTable, useLessonStore } from '@/entities/lesson'
import type { LessonPerspective } from '@/entities/lesson'
import { SCHEDULE_TABS, useLessonSchedule } from '../model/use-lesson-schedule'

const props = defineProps<{ perspective: Exclude<LessonPerspective, 'admin'> }>()

const lessonStore = useLessonStore()
const { tab, visibleItems, summary } = useLessonSchedule(props.perspective)

const tabBase =
  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900'
const tabActive = 'bg-zinc-900 text-zinc-50'
const tabIdle = 'text-zinc-600 hover:text-zinc-900'
</script>
