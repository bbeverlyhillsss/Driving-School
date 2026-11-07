<template>
  <p v-if="profileStore.isLoading" class="text-zinc-600">Loading...</p>
  <p v-else-if="profileStore.loadError" class="text-red-600">{{ profileStore.loadError }}</p>

  <BaseCard v-else-if="profileStore.profile" class="max-w-3xl">
    <BaseCardHeader>
      <BaseCardTitle>My profile</BaseCardTitle>
      <BaseCardDescription>
        The school uses these details to contact you and to check the age requirement.
      </BaseCardDescription>
    </BaseCardHeader>

    <BaseCardContent>
      <dl class="grid gap-4 sm:grid-cols-3">
        <div>
          <dt class="text-sm text-zinc-400">Full name</dt>
          <dd class="font-medium text-zinc-50">{{ profileStore.profile.fullName }}</dd>
        </div>
        <div>
          <dt class="text-sm text-zinc-400">Email</dt>
          <dd class="font-medium break-all text-zinc-50">{{ profileStore.profile.email }}</dd>
        </div>
        <div>
          <dt class="text-sm text-zinc-400">Group</dt>
          <dd class="font-medium text-zinc-50">
            {{ profileStore.profile.group?.name ?? 'Not assigned yet' }}
          </dd>
        </div>
      </dl>

      <StudentForm
        mode="self"
        :initial="toStudentFormValues(profileStore.profile)"
        :errors
        :server-error="serverError"
        :loading="isSaving"
        :cancellable="false"
        submit-label="Save"
        @submit="submit"
      />

      <p v-if="isSaved" role="status" class="text-sm text-emerald-400">Profile saved.</p>
    </BaseCardContent>
  </BaseCard>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { StudentForm, toStudentFormValues, useStudentProfileStore } from '@/entities/student'
import {
  BaseCard,
  BaseCardContent,
  BaseCardDescription,
  BaseCardHeader,
  BaseCardTitle,
} from '@/shared/ui/card'
import { useEditProfile } from '../model/use-edit-profile'

const profileStore = useStudentProfileStore()

const { errors, serverError, isLoading: isSaving, isSaved, submit } = useEditProfile()

onMounted(profileStore.load)
</script>