<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <RegisterForm :to="MAIN_LINK" />
  </div>
</template>

<script setup lang="ts">
import RegisterForm from '@/features/auth/register/ui/index'
import { MAIN_LINK } from '@/shared/config/'
</script>
