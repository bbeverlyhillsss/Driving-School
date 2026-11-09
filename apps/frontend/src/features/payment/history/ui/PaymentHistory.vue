<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-lg font-semibold text-zinc-900">Payments</h2>

    <dl class="grid gap-3 sm:grid-cols-2">
      <div class="rounded-xl border border-zinc-300 bg-white px-5 py-4">
        <dt class="text-sm text-zinc-500">Paid in total</dt>
        <dd class="mt-1 text-lg font-semibold text-zinc-900">{{ formatAmount(paidTotal) }}</dd>
      </div>
      <div v-if="pendingTotal > 0" class="rounded-xl border border-zinc-300 bg-white px-5 py-4">
        <dt class="text-sm text-zinc-500">Pending</dt>
        <dd class="mt-1 text-lg font-semibold text-zinc-900">{{ formatAmount(pendingTotal) }}</dd>
      </div>
    </dl>

    <p v-if="paymentStore.isLoading" class="text-zinc-600">Loading...</p>
    <p v-else-if="paymentStore.loadError" class="text-red-600">{{ paymentStore.loadError }}</p>
    <PaymentTable v-else :items="paymentStore.items" perspective="student" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatAmount, getPaidTotal, getPendingTotal, PaymentTable, usePaymentStore } from '@/entities/payment'

const paymentStore = usePaymentStore()

const paidTotal = computed(() => getPaidTotal(paymentStore.items))
const pendingTotal = computed(() => getPendingTotal(paymentStore.items))
</script>