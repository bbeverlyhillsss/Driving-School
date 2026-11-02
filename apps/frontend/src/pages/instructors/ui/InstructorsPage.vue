<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-zinc-900">Instructors</h1>

    <CreateInstructor v-if="isCreating" @close="isCreating = false" />
    <EditInstructor
      v-if="editing"
      :key="editing.id"
      :instructor="editing"
      @close="editing = null"
    />

    <div class="flex items-center gap-2">
      <BaseSearchInput
        v-model="search"
        placeholder="Search by name, phone or email"
        class="w-full max-w-sm"
      />
      <BaseIconButton label="Filter" class="size-10 border border-zinc-300 bg-white">
        <ListFilter :size="16" />
      </BaseIconButton>
    </div>

    <p v-if="instructorStore.isLoading" class="text-zinc-600">Loading...</p>
    <p v-else-if="instructorStore.loadError" class="text-red-600">
      {{ instructorStore.loadError }}
    </p>
    <InstructorTable v-else :items="filteredItems" :total="instructorStore.items.length">
      <template v-if="isAdmin" #header-actions>
        <BaseButton size="sm" variant="inverse" @click="isCreating = true">
          <Plus :size="16" />
          Create instructor
        </BaseButton>
      </template>

      <template v-if="isAdmin" #actions="{ instructor }">
        <div class="flex justify-end gap-1">
          <BaseIconButton label="Edit" @click="editing = instructor">
            <Pencil :size="16" />
          </BaseIconButton>
          <DeleteInstructor :instructor />
        </div>
      </template>
    </InstructorTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ListFilter, Pencil, Plus } from 'lucide-vue-next'
import { Role } from '@driving-school/shared'
import type { SharedInstructor } from '@driving-school/shared'
import { useUserStore } from '@/entities/user'
import { InstructorTable, useInstructorStore } from '@/entities/instructor'
import { useCategoryStore } from '@/entities/category'
import { CreateInstructor } from '@/features/instructor/create'
import { EditInstructor } from '@/features/instructor/edit'
import { DeleteInstructor } from '@/features/instructor/delete'
import { BaseButton } from '@/shared/ui/button'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseSearchInput } from '@/shared/ui/search-input'

const userStore = useUserStore()
const instructorStore = useInstructorStore()
const categoryStore = useCategoryStore()

const isAdmin = computed(() => userStore.role === Role.ADMIN)
const isCreating = ref(false)
const editing = ref<SharedInstructor | null>(null)
const search = ref('')

const filteredItems = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return instructorStore.items
  return instructorStore.items.filter((instructor) =>
    [instructor.fullName, instructor.phone ?? '', instructor.email].some((field) =>
      field.toLowerCase().includes(query),
    ),
  )
})

onMounted(() => {
  void instructorStore.load()
  void categoryStore.load()
})
</script>
