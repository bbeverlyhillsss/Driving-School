<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <RegisterForm :to="ROOT_LINK" />
  </div>
</template>

<script setup lang="ts">
import { RegisterForm } from '@/features/auth/register/'
import { ROOT_LINK } from '@/shared/config/'
</script>
