<script setup lang="ts">
import { useLogin } from '../model'

const emit = defineEmits<{ success: [] }>()
const { form, isLoading, errors, submit } = useLogin(() => emit('success'))
</script>

<template>
  <form class="flex w-full max-w-sm flex-col gap-4" @submit.prevent="submit">
    <h1 class="text-2xl font-bold">Вхід</h1>

    <input v-model="form.email" type="email" placeholder="Email" class="rounded border p-2" />
    <input
      v-model="form.password"
      type="password"
      placeholder="Пароль"
      class="rounded border p-2"
    />

    <ul v-if="errors.length" class="text-sm text-red-500">
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>

    <button
      type="submit"
      :disabled="isLoading"
      class="rounded bg-blue-500 p-2 text-white disabled:opacity-50"
    >
      {{ isLoading ? 'Зачекайте...' : 'Увійти' }}
    </button>

    <slot name="footer" />
  </form>
</template>
