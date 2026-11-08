<template>
  <BaseIconButton label="Generate theory schedule" @click="isOpen = true">
    <CalendarPlus :size="16" />
  </BaseIconButton>

  <BaseModal
    v-if="isOpen"
    title="Generate theory schedule"
    :description="group.name"
    @close="close"
  >
    <template v-if="createdCount === null">
      <p class="text-sm text-zinc-300">
        {{ summary }}
      </p>

      <p v-if="error" role="alert" class="text-sm text-red-400">{{ error }}</p>

      <div class="flex justify-end gap-3">
        <BaseButton variant="secondary" data-autofocus @click="close">Cancel</BaseButton>
        <BaseButton variant="inverse" :loading="isLoading" @click="onConfirm">Generate</BaseButton>
      </div>
    </template>

    <template v-else>
      <p role="status" class="text-sm text-emerald-400">
        Theory schedule created: {{ createdCount }} lessons.
      </p>
      <div class="flex justify-end">
        <BaseButton variant="inverse" data-autofocus @click="close">Close</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CalendarPlus } from 'lucide-vue-next'
import type { SharedGroup } from '@driving-school/shared'
import { GROUP_SHIFT_LABEL, useGroupStore } from '@/entities/group'
import { useLessonStore } from '@/entities/lesson'
import { BaseButton } from '@/shared/ui/button'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseModal } from '@/shared/ui/modal'

const props = defineProps<{ group: SharedGroup }>()

const groupStore = useGroupStore()
const lessonStore = useLessonStore()

const isOpen = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)
const createdCount = ref<number | null>(null)

const formatDate = (value: string): string =>
  new Date(`${value}T00:00:00`).toLocaleDateString('uk-UA')

const summary = computed(
  () =>
    `Create 20 theory lessons from ${formatDate(props.group.startDate)} to ${formatDate(props.group.endDate)}, ` +
    `Monday to Friday, ${GROUP_SHIFT_LABEL[props.group.shift]}. Public holidays are not skipped, cancel them manually.`,
)

const close = (): void => {
  isOpen.value = false
  error.value = null
  createdCount.value = null
}

const onConfirm = async (): Promise<void> => {
  error.value = null
  isLoading.value = true
  const response = await lessonStore.generateTheory(props.group.id)
  isLoading.value = false

  if (!response.ok) {
    error.value = response.error?.message ?? 'Server is unavailable'
    return
  }

  groupStore.setLessonsCount(props.group.id, response.data.length)
  createdCount.value = response.data.length
}
</script>