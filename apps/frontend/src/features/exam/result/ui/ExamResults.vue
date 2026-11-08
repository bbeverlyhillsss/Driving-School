<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-lg font-semibold text-zinc-900">Exams</h2>

    <dl v-if="perspective === 'student'" class="grid gap-3 sm:grid-cols-2">
      <div
        v-for="item in statuses"
        :key="item.label"
        class="rounded-xl border border-zinc-300 bg-white px-5 py-4"
      >
        <dt class="text-sm text-zinc-500">{{ item.label }}</dt>
        <dd :class="['mt-1 font-semibold', item.tone]">{{ item.value }}</dd>
      </div>
    </dl>

    <p v-if="examStore.isLoading" class="text-zinc-600">Loading...</p>
    <p v-else-if="examStore.loadError" class="text-red-600">{{ examStore.loadError }}</p>
    <ExamTable
      v-else
      :items="examStore.items"
      :perspective="perspective === 'student' ? 'student' : 'staff'"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LessonType } from '@driving-school/shared'
import {
  EXAM_STATUS_LABEL,
  EXAM_TYPE_LABEL,
  ExamTable,
  getExamStatus,
  useExamStore,
} from '@/entities/exam'
import type { ExamStatus } from '@/entities/exam'

defineProps<{ perspective: 'student' | 'instructor' }>()

const examStore = useExamStore()

const toneByStatus: Record<ExamStatus, string> = {
  passed: 'text-emerald-700',
  failed: 'text-red-600',
  scheduled: 'text-zinc-900',
  none: 'text-zinc-500',
}

const statuses = computed(() =>
  Object.values(LessonType).map((type) => {
    const status = getExamStatus(examStore.items, type)
    return {
      label: `${EXAM_TYPE_LABEL[type]} exam`,
      value: EXAM_STATUS_LABEL[status],
      tone: toneByStatus[status],
    }
  }),
)
</script>