<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-zinc-900">Lessons</h1>

    <CreatePractice v-if="isCreating" @close="isCreating = false" />
    <EditPractice v-if="editing" :key="editing.id" :lesson="editing" @close="editing = null" />

    <div class="flex items-center gap-2">
      <BaseSearchInput
        v-model="search"
        placeholder="Search by group, student, instructor or car"
        class="w-full max-w-sm"
      />
      <BaseButton variant="secondary" class="h-10" @click="showPast = !showPast">
        {{ showPast ? 'Hide past lessons' : 'Show past lessons' }}
      </BaseButton>
    </div>

    <p v-if="lessonStore.isLoading" class="text-zinc-600">Loading...</p>
    <p v-else-if="lessonStore.loadError" class="text-red-600">{{ lessonStore.loadError }}</p>
    <LessonTable v-else :items="filteredItems" :total="lessonStore.items.length">
      <template #header-actions>
        <BaseButton size="sm" variant="inverse" @click="isCreating = true">
          <Plus :size="16" />
          Create practice
        </BaseButton>
      </template>

      <template #actions="{ lesson }">
        <div class="flex justify-end gap-1">
          <BaseIconButton v-if="isLessonEditable(lesson)" label="Edit" @click="editing = lesson">
            <Pencil :size="16" />
          </BaseIconButton>
          <CancelLesson v-if="isLessonCancellable(lesson)" :lesson />
        </div>
      </template>
    </LessonTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Pencil, Plus } from 'lucide-vue-next'
import type { SharedLesson } from '@driving-school/shared'
import { useCarStore } from '@/entities/car'
import { useGroupStore } from '@/entities/group'
import { useInstructorStore } from '@/entities/instructor'
import {
  isLessonCancellable,
  isLessonEditable,
  LessonTable,
  useLessonStore,
} from '@/entities/lesson'
import { useStudentStore } from '@/entities/student'
import { CancelLesson } from '@/features/lesson/cancel'
import { CreatePractice } from '@/features/lesson/create-practice'
import { EditPractice } from '@/features/lesson/edit-practice'
import { BaseButton } from '@/shared/ui/button'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseSearchInput } from '@/shared/ui/search-input'

const lessonStore = useLessonStore()
const studentStore = useStudentStore()
const instructorStore = useInstructorStore()
const carStore = useCarStore()
const groupStore = useGroupStore()

const isCreating = ref(false)
const editing = ref<SharedLesson | null>(null)
const search = ref('')
const showPast = ref(false)

const today = (): string => new Date().toLocaleDateString('sv-SE')

const filteredItems = computed(() => {
  const query = search.value.trim().toLowerCase()
  const fromDate = today()

  return lessonStore.items.filter((lesson) => {
    if (!showPast.value && lesson.date < fromDate) return false
    if (!query) return true

    return [
      lesson.date,
      lesson.group?.name ?? '',
      lesson.student?.fullName ?? '',
      lesson.instructor.fullName,
      lesson.car?.plateNumber ?? '',
      lesson.car ? `${lesson.car.brand} ${lesson.car.model}` : '',
    ].some((field) => field.toLowerCase().includes(query))
  })
})

onMounted(() => {
  void lessonStore.load()
  void studentStore.load()
  void instructorStore.load()
  void carStore.load()
  void groupStore.load()
})
</script>