<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-zinc-900">Students</h1>

    <EditStudent v-if="editing" :key="editing.id" :student="editing" @close="editing = null" />

    <div class="flex items-center gap-2">
      <BaseSearchInput
        v-model="search"
        placeholder="Search by name, email, phone or group"
        class="w-full max-w-sm"
      />
      <BaseIconButton label="Filter" class="size-10 border border-zinc-300 bg-white">
        <ListFilter :size="16" />
      </BaseIconButton>
    </div>

    <p v-if="studentStore.isLoading" class="text-zinc-600">Loading...</p>
    <p v-else-if="studentStore.loadError" class="text-red-600">{{ studentStore.loadError }}</p>
    <StudentTable v-else :items="filteredItems" :total="studentStore.items.length">
      <template #actions="{ student }">
        <div class="flex justify-end gap-1">
          <BaseIconButton label="Edit" @click="editing = student">
            <Pencil :size="16" />
          </BaseIconButton>
        </div>
      </template>
    </StudentTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ListFilter, Pencil } from 'lucide-vue-next'
import type { SharedStudent } from '@driving-school/shared'
import { StudentTable, useStudentStore } from '@/entities/student'
import { EditStudent } from '@/features/student/edit'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseSearchInput } from '@/shared/ui/search-input'

const studentStore = useStudentStore()

const editing = ref<SharedStudent | null>(null)
const search = ref('')

const filteredItems = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return studentStore.items
  return studentStore.items.filter((student) =>
    [student.fullName, student.email, student.phone ?? '', student.group?.name ?? ''].some(
      (field) => field.toLowerCase().includes(query),
    ),
  )
})

onMounted(studentStore.load)
</script>