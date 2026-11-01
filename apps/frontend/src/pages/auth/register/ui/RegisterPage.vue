<template>
  <RegisterForm :to="ROOT_LINK">
    <template #footer>
      <RouterLink
        :to="LOGIN_LINK"
        class="text-center text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300"
      >
        
Already have an account? Log in
      </RouterLink>
    </template>
  </RegisterForm>
</template>

<script setup lang="ts">
import { RegisterForm } from '@/features/auth/register/'
import { LOGIN_LINK, ROOT_LINK } from '@/shared/config/'
</script>
