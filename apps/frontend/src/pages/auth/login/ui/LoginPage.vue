<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <LoginForm @success="router.push('/')">
      <template #footer>
        <router-link :to="REGISTER_LINK" class="text-sm text-blue-500">
          Немає акаунта? Зареєструватись
        </router-link>
      </template>
    </LoginForm>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import LoginForm from '@/features/auth/login/ui/LoginForm.vue'
import { REGISTER_LINK } from '../../register/config/route'

const router = useRouter()
</script>
