<template>
  <div class="flex flex-col gap-8">
    <h1 class="text-2xl font-bold text-zinc-900">My workspace</h1>

    <p v-if="!isReady" class="text-zinc-600">Loading...</p>
    <template v-else>
      <StudentOverview />
      <LessonSchedule perspective="student" />
      <ExamResults perspective="student" />
    </template>

    <StudentProfile />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCategoryStore } from '@/entities/category'
import { useExamStore } from '@/entities/exam'
import { useGroupStore } from '@/entities/group'
import { useInstructorStore } from '@/entities/instructor'
import { useLessonStore } from '@/entities/lesson'
import { ExamResults } from '@/features/exam/result'
import { LessonSchedule } from '@/features/lesson/schedule'
import { StudentOverview } from '@/features/student/overview'
import { StudentProfile } from '@/features/student/profile'

const groupStore = useGroupStore()
const instructorStore = useInstructorStore()
const categoryStore = useCategoryStore()
const lessonStore = useLessonStore()
const examStore = useExamStore()

const isReady = ref(false)

onMounted(async () => {
  await Promise.all([
    groupStore.load(),
    instructorStore.load(),
    categoryStore.load(),
    lessonStore.load(),
    examStore.load(),
  ])
  isReady.value = true
})
</script>