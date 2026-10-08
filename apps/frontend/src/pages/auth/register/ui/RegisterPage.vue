<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <RegisterForm @success="router.push('/')" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import RegisterForm from '@/features/auth/register/ui/index'

const router = useRouter()
</script>
