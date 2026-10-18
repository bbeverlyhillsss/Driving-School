<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <LoginForm :to="ROOT_LINK">
      <template #footer>
        <router-link :to="REGISTER_LINK" class="text-sm text-blue-500">
          Немає акаунта? Зареєструватись
        </router-link>
      </template>
    </LoginForm>
  </div>
</template>

<script setup lang="ts">
import { LoginForm } from '@/features/auth/login/'
import { REGISTER_LINK } from '../../register/config/route'
import { ROOT_LINK } from '@/shared/config'
</script>
