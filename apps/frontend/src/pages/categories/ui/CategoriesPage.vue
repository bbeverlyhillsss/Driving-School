<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-zinc-900">Categories</h1>

    <CreateCategory v-if="isCreating" @close="isCreating = false" />
    <EditCategory v-if="editing" :key="editing.id" :category="editing" @close="editing = null" />

    <div class="flex items-center gap-2">
      <BaseSearchInput v-model="search" placeholder="Search by name" class="w-full max-w-sm" />
      <BaseIconButton label="Filter" class="size-10 border border-zinc-300 bg-white">
        <ListFilter :size="16" />
      </BaseIconButton>
    </div>

    <p v-if="categoryStore.isLoading" class="text-zinc-600">Loading...</p>
    <p v-else-if="categoryStore.loadError" class="text-red-600">{{ categoryStore.loadError }}</p>
    <CategoryTable v-else :items="filteredItems" :total="categoryStore.items.length">
      <template v-if="isAdmin" #header-actions>
        <BaseButton size="sm" variant="inverse" @click="isCreating = true">
          <Plus :size="16" />
          Create category
        </BaseButton>
      </template>

      <template v-if="isAdmin" #actions="{ category }">
        <div class="flex justify-end gap-1">
          <BaseIconButton label="Edit" @click="editing = category">
            <Pencil :size="16" />
          </BaseIconButton>
          <DeleteCategory :category />
        </div>
      </template>
    </CategoryTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ListFilter, Pencil, Plus } from 'lucide-vue-next'
import { Role } from '@driving-school/shared'
import type { SharedCategory } from '@driving-school/shared'
import { useUserStore } from '@/entities/user'
import { CategoryTable, useCategoryStore } from '@/entities/category'
import { CreateCategory } from '@/features/category'
import { EditCategory } from '@/features/category/edit'
import { DeleteCategory } from '@/features/category/delete'
import { BaseButton } from '@/shared/ui/button'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseSearchInput } from '@/shared/ui/search-input'

const userStore = useUserStore()
const categoryStore = useCategoryStore()

const isAdmin = computed(() => userStore.role === Role.ADMIN)
const isCreating = ref(false)
const editing = ref<SharedCategory | null>(null)
const search = ref('')

const filteredItems = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return categoryStore.items
  return categoryStore.items.filter((category) => category.name.toLowerCase().includes(query))
})

onMounted(categoryStore.load)
</script>
