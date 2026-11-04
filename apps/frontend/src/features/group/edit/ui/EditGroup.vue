<template>
  <BaseModal
    title="Edit group"
    :description="`Category ${group.category.name}`"
    @close="emit('close')"
  >
    <GroupForm
      :instructors="instructorStore.items"
      :category-id="group.category.id"
      :initial="toGroupFormValues(group)"
      :errors
      :server-error="serverError"
      :loading="isLoading"
      submit-label="Save"
      @submit="submit"
      @cancel="emit('close')"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import type { SharedGroup } from '@driving-school/shared'
import { GroupForm, toGroupFormValues } from '@/entities/group'
import { useInstructorStore } from '@/entities/instructor'
import { BaseModal } from '@/shared/ui/modal'
import { useEditGroup } from '../model/use-edit-group'

const props = defineProps<{ group: SharedGroup }>()
const emit = defineEmits<{ close: [] }>()

const instructorStore = useInstructorStore()

const { errors, serverError, isLoading, submit } = useEditGroup(props.group.id, () =>
  emit('close'),
)
</script>