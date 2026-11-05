<template>
  <BaseModal
    title="Members"
    :description="`${group.name} · Category ${group.category.name}`"
    @close="emit('close')"
  >
    <p v-if="isLoading" class="text-sm text-zinc-400">Loading...</p>
    <p v-else-if="loadError" role="alert" class="text-sm text-red-400">{{ loadError }}</p>

    <template v-else>
      <ul v-if="members.length" class="divide-y divide-zinc-800 rounded-xl border border-zinc-800">
        <li
          v-for="member in members"
          :key="member.id"
          class="flex items-center justify-between gap-4 px-4 py-3"
        >
          <div class="min-w-0">
            <p class="truncate font-medium text-zinc-50">{{ member.fullName }}</p>
            <p v-if="details(member)" class="truncate text-sm text-zinc-400">
              {{ details(member) }}
            </p>
          </div>
          <BaseIconButton
            v-if="canManage"
            label="Remove from group"
            tone="danger"
            :loading="removingId === member.id"
            @click="remove(member.id)"
          >
            <UserMinus :size="16" />
          </BaseIconButton>
        </li>
      </ul>
      <p v-else class="text-sm text-zinc-400">No students in this group yet.</p>

      <div v-if="canManage" class="flex flex-col gap-3">
        <p v-if="isEnded" class="text-sm text-zinc-400">
          The group has ended, new students cannot be added.
        </p>
        <p v-else-if="!availableStudents.length" class="text-sm text-zinc-400">
          No available students. Only active students without a group can be added.
        </p>
        <div v-else class="flex items-center gap-2">
          <div class="flex-1">
            <BaseSelect v-model="selectedStudentId" aria-label="Student to add">
              <option value="" disabled>Select student</option>
              <option
                v-for="student in availableStudents"
                :key="student.id"
                :value="String(student.id)"
              >
                {{ student.fullName }} ({{ student.email }})
              </option>
            </BaseSelect>
          </div>
          <BaseButton
            variant="inverse"
            :loading="isAdding"
            :disabled="!selectedStudentId"
            @click="add"
          >
            <UserPlus :size="16" />
            Add
          </BaseButton>
        </div>

        <p v-if="actionError" role="alert" class="text-sm text-red-400">{{ actionError }}</p>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { UserMinus, UserPlus } from 'lucide-vue-next'
import type { SharedGroup, SharedGroupMember } from '@driving-school/shared'
import { BaseButton } from '@/shared/ui/button'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseModal } from '@/shared/ui/modal'
import { BaseSelect } from '@/shared/ui/select'
import { useGroupMembers } from '../model/use-group-members'

const props = defineProps<{ group: SharedGroup; canManage: boolean }>()
const emit = defineEmits<{ close: [] }>()

const {
  members,
  isLoading,
  loadError,
  actionError,
  selectedStudentId,
  isAdding,
  removingId,
  isEnded,
  availableStudents,
  add,
  remove,
} = useGroupMembers(props.group, props.canManage)

const details = (member: SharedGroupMember): string =>
  [member.email, member.phone].filter((value): value is string => !!value).join(' · ')
</script>