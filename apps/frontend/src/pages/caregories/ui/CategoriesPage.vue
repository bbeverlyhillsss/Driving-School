<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-slate-900">Категорії</h1>

    <CreateCategory v-if="isAdmin" />

    <p v-if="categoryStore.isLoading" class="text-slate-600">Завантаження...</p>
    <p v-else-if="categoryStore.loadError" class="text-red-600">{{ categoryStore.loadError }}</p>
    <CategoryTable v-else :items="categoryStore.items" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { CategoryTable, useCategoryStore } from '@/entities/category'
import { computed } from 'vue'
import { Role } from '@driving-school/shared'
import { useUserStore } from '@/entities/user'
import { CreateCategory } from '@/features/category/index'

const userStore = useUserStore()
const isAdmin = computed(() => userStore.role === Role.ADMIN)

const categoryStore = useCategoryStore()

onMounted(categoryStore.load)
</script>
