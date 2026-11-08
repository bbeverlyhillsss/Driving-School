<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <BaseCard>
      <BaseCardHeader>
        <BaseCardTitle>My group</BaseCardTitle>
        <BaseCardDescription>
          {{ group ? `Category ${group.category.name}` : 'Not assigned yet' }}
        </BaseCardDescription>
      </BaseCardHeader>

      <BaseCardContent v-if="group">
        <dl class="grid gap-4 sm:grid-cols-2">
          <div>
            <dt class="text-sm text-zinc-400">Group</dt>
            <dd class="font-medium text-zinc-50">{{ group.name }}</dd>
          </div>
          <div>
            <dt class="text-sm text-zinc-400">Shift</dt>
            <dd class="font-medium text-zinc-50">{{ GROUP_SHIFT_LABEL[group.shift] }}</dd>
          </div>
          <div>
            <dt class="text-sm text-zinc-400">Theory course</dt>
            <dd class="font-medium text-zinc-50">
              {{ formatDate(group.startDate) }} – {{ formatDate(group.endDate) }}
            </dd>
          </div>
          <div>
            <dt class="text-sm text-zinc-400">Instructor</dt>
            <dd class="font-medium text-zinc-50">{{ group.instructor.fullName }}</dd>
            <dd v-if="instructor?.phone" class="text-sm text-zinc-300">{{ instructor.phone }}</dd>
            <dd v-if="instructor" class="text-sm break-all text-zinc-300">
              <a :href="`mailto:${instructor.email}`" class="underline-offset-4 hover:underline">
                {{ instructor.email }}
              </a>
            </dd>
          </div>
        </dl>
      </BaseCardContent>

      <p v-else class="text-sm text-zinc-400">
        You are not in a group yet. The school will add you soon, and your schedule will appear here.
      </p>
    </BaseCard>

    <BaseCard v-if="group">
      <BaseCardHeader>
        <BaseCardTitle>Progress</BaseCardTitle>
        <BaseCardDescription>
          Held lessons are counted, planned ones are shown dimmer.
        </BaseCardDescription>
      </BaseCardHeader>

      <BaseCardContent>
        <BaseProgress
          v-if="theoryTotal > 0"
          label="Theory lessons"
          :value="theory.held"
          :extra="theory.planned"
          :max="theoryTotal"
        />
        <p v-else class="text-sm text-zinc-400">The theory schedule has not been created yet.</p>

        <BaseProgress
          label="Practice lessons"
          :value="practice.held"
          :extra="practice.planned"
          :max="practiceMax"
        />
        <p v-if="isPracticeLocked" class="text-sm text-zinc-400">
          Practice starts after the theory course ends on {{ formatDate(group.endDate) }}.
        </p>
      </BaseCardContent>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCategoryStore } from '@/entities/category'
import { GROUP_SHIFT_LABEL, useGroupStore } from '@/entities/group'
import { useInstructorStore } from '@/entities/instructor'
import { getPracticeProgress, getTheoryProgress, useLessonStore } from '@/entities/lesson'
import {
  BaseCard,
  BaseCardContent,
  BaseCardDescription,
  BaseCardHeader,
  BaseCardTitle,
} from '@/shared/ui/card'
import { BaseProgress } from '@/shared/ui/progress'

const groupStore = useGroupStore()
const instructorStore = useInstructorStore()
const categoryStore = useCategoryStore()
const lessonStore = useLessonStore()

const formatDate = (value: string): string =>
  new Date(`${value}T00:00:00`).toLocaleDateString('uk-UA')

const group = computed(() => groupStore.items[0] ?? null)

const instructor = computed(() => {
  const instructorId = group.value?.instructor.id
  return instructorStore.items.find((item) => item.id === instructorId) ?? null
})

const category = computed(() => {
  const categoryId = group.value?.category.id
  return categoryStore.items.find((item) => item.id === categoryId) ?? null
})

const theory = computed(() => getTheoryProgress(lessonStore.items))
const practice = computed(() => getPracticeProgress(lessonStore.items))

const theoryTotal = computed(() => theory.value.held + theory.value.planned)

const practiceMax = computed(
  () => category.value?.practiceHours ?? practice.value.held + practice.value.planned,
)

const isPracticeLocked = computed(() => {
  if (!group.value) return false
  return new Date().toLocaleDateString('sv-SE') <= group.value.endDate
})
</script>