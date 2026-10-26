<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-slate-900">Категорії</h1>

    <CreateCategory v-if="isAdmin" />
    <EditCategory v-if="editing" :key="editing.id" :category="editing" @close="editing = null" />

    <p v-if="deleteError" class="text-sm text-red-600">{{ deleteError }}</p>

    <p v-if="categoryStore.isLoading" class="text-slate-600">Завантаження...</p>
    <p v-else-if="categoryStore.loadError" class="text-red-600">{{ categoryStore.loadError }}</p>
    <CategoryTable v-else :items="categoryStore.items">
      <template v-if="isAdmin" #actions="{ category }">
        <div class="flex gap-2">
          <BaseButton size="sm" variant="success" @click="editing = category">
            Редагувати
          </BaseButton>
          <DeleteCategory :category @error="deleteError = $event" />
        </div>
      </template>
    </CategoryTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Role } from '@driving-school/shared'
import type { SharedCategory } from '@driving-school/shared'
import { useUserStore } from '@/entities/user'
import { CategoryTable, useCategoryStore } from '@/entities/category'
import { CreateCategory } from '@/features/category'
import { EditCategory } from '@/features/category/edit'
import { DeleteCategory } from '@/features/category/delete'
import { BaseButton } from '@/shared/ui/button'

const userStore = useUserStore()
const categoryStore = useCategoryStore()

const isAdmin = computed(() => userStore.role === Role.ADMIN)
const editing = ref<SharedCategory | null>(null)
const deleteError = ref<string | null>(null)

onMounted(categoryStore.load)
</script>
