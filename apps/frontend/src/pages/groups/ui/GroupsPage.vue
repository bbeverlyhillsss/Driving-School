<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-zinc-900">Groups</h1>

    <CreateGroup v-if="isCreating" @close="isCreating = false" />
    <EditGroup v-if="editing" :key="editing.id" :group="editing" @close="editing = null" />
    <GroupMembers
      v-if="viewingMembers"
      :key="viewingMembers.id"
      :group="viewingMembers"
      :can-manage="isAdmin"
      @close="viewingMembers = null"
    />

    <div class="flex items-center gap-2">
      <BaseSearchInput
        v-model="search"
        placeholder="Search by name, instructor or category"
        class="w-full max-w-sm"
      />
      <BaseIconButton label="Filter" class="size-10 border border-zinc-300 bg-white">
        <ListFilter :size="16" />
      </BaseIconButton>
    </div>

    <p v-if="groupStore.isLoading" class="text-zinc-600">Loading...</p>
    <p v-else-if="groupStore.loadError" class="text-red-600">{{ groupStore.loadError }}</p>
    <GroupTable v-else :items="filteredItems" :total="groupStore.items.length">
      <template v-if="isAdmin" #header-actions>
        <BaseButton size="sm" variant="inverse" @click="isCreating = true">
          <Plus :size="16" />
          Create group
        </BaseButton>
      </template>

      <template #actions="{ group }">
        <div class="flex justify-end gap-1">
          <BaseIconButton label="Members" @click="viewingMembers = group">
            <Users :size="16" />
          </BaseIconButton>
          <template v-if="isAdmin">
            <GenerateTheory v-if="group.lessonsCount === 0" :group />
            <BaseIconButton label="Edit" @click="editing = group">
              <Pencil :size="16" />
            </BaseIconButton>
            <DeleteGroup :group />
          </template>
        </div>
      </template>
    </GroupTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ListFilter, Pencil, Plus, Users } from 'lucide-vue-next'
import { Role } from '@driving-school/shared'
import type { SharedGroup } from '@driving-school/shared'
import { useUserStore } from '@/entities/user'
import { GroupTable, useGroupStore } from '@/entities/group'
import { useInstructorStore } from '@/entities/instructor'
import { CreateGroup } from '@/features/group/create'
import { EditGroup } from '@/features/group/edit'
import { DeleteGroup } from '@/features/group/delete'
import { GroupMembers } from '@/features/group/members'
import { BaseButton } from '@/shared/ui/button'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseSearchInput } from '@/shared/ui/search-input'
import { GenerateTheory } from '@/features/group/generate-theory'

const userStore = useUserStore()
const groupStore = useGroupStore()
const instructorStore = useInstructorStore()

const isAdmin = computed(() => userStore.role === Role.ADMIN)
const isCreating = ref(false)
const editing = ref<SharedGroup | null>(null)
const viewingMembers = ref<SharedGroup | null>(null)
const search = ref('')

const filteredItems = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return groupStore.items
  return groupStore.items.filter((group) =>
    [group.name, group.instructor.fullName, group.category.name].some((field) =>
      field.toLowerCase().includes(query),
    ),
  )
})

onMounted(() => {
  void groupStore.load()
  if (isAdmin.value) void instructorStore.load()
})
</script>
