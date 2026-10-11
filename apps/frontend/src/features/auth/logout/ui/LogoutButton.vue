<template>
  <button
    type="button"
    :disabled="isLoading"
    class="rounded border px-3 py-1 disabled:opacity-50"
    @click="submit"
  >
    Вийти
  </button>
</template>

<script setup lang="ts">
import { useLogout } from '../model/useLogout'

const { isLoading, submit } = useLogout()
</script>
