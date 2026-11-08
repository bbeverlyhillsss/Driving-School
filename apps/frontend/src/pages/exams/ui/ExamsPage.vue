<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-zinc-900">Exams</h1>

    <CreateExam v-if="isCreating" @close="isCreating = false" />
    <EditExam v-if="editing" :key="getExamKey(editing)" :exam="editing" @close="editing = null" />

    <div class="flex items-center gap-2">
      <BaseSearchInput
        v-model="search"
        placeholder="Search by student, group, type or result"
        class="w-full max-w-sm"
      />
    </div>

    <p v-if="examStore.isLoading" class="text-zinc-600">Loading...</p>
    <p v-else-if="examStore.loadError" class="text-red-600">{{ examStore.loadError }}</p>
    <ExamTable v-else :items="filteredItems" :total="examStore.items.length">
      <template #header-actions>
        <BaseButton size="sm" variant="inverse" @click="isCreating = true">
          <Plus :size="16" />
          Create exam
        </BaseButton>
      </template>

      <template #actions="{ exam }">
        <div class="flex justify-end gap-1">
          <BaseIconButton label="Edit result" @click="editing = exam">
            <Pencil :size="16" />
          </BaseIconButton>
          <DeleteExam :exam />
        </div>
      </template>
    </ExamTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Pencil, Plus } from 'lucide-vue-next'
import type { SharedExam } from '@driving-school/shared'
import {
  EXAM_RESULT_LABEL,
  EXAM_TYPE_LABEL,
  ExamTable,
  formatExamDate,
  getExamKey,
  useExamStore,
} from '@/entities/exam'
import { useStudentStore } from '@/entities/student'
import { CreateExam } from '@/features/exam/create'
import { DeleteExam } from '@/features/exam/delete'
import { EditExam } from '@/features/exam/edit'
import { BaseButton } from '@/shared/ui/button'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseSearchInput } from '@/shared/ui/search-input'

const examStore = useExamStore()
const studentStore = useStudentStore()

const isCreating = ref(false)
const editing = ref<SharedExam | null>(null)
const search = ref('')

const filteredItems = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return examStore.items

  return examStore.items.filter((exam) =>
    [
      exam.student.fullName,
      exam.student.group?.name ?? '',
      EXAM_TYPE_LABEL[exam.type],
      exam.result ? EXAM_RESULT_LABEL[exam.result] : 'pending',
      formatExamDate(exam.date),
    ].some((field) => field.toLowerCase().includes(query)),
  )
})

onMounted(() => {
  void examStore.load()
  void studentStore.load()
})
</script>