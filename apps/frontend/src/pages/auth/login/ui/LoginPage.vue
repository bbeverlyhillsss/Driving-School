<template>
  <LoginForm :to="ROOT_LINK">
    <template #footer>
      <RouterLink
        :to="REGISTER_LINK"
        class="text-center text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300"
      >
        Don't have an account? Register
      </RouterLink>
    </template>
  </LoginForm>
</template>

<script setup lang="ts">
import { LoginForm } from '@/features/auth/login/'
import { REGISTER_LINK } from '../../register/config/route'
import { ROOT_LINK } from '@/shared/config'
</script>
