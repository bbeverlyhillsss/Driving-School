import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PaymentPayload, SharedPayment } from '@driving-school/shared'
import { getPayments } from '../api/get-payments'
import { createPayment } from '../api/create-payment'
import { updatePayment } from '../api/update-payment'
import { deletePayment } from '../api/delete-payment'

const sortPayments = (items: SharedPayment[]): SharedPayment[] =>
  [...items].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)

export const usePaymentStore = defineStore('payment', () => {
  const items = ref<SharedPayment[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)

  const load = async (): Promise<void> => {
    isLoading.value = true
    loadError.value = null

    const response = await getPayments()
    isLoading.value = false

    if (!response.ok) {
      loadError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    items.value = sortPayments(response.data)
  }

  const create = async (payload: PaymentPayload) => {
    const response = await createPayment(payload)
    if (response.ok) items.value = sortPayments([...items.value, response.data])
    return response
  }

  const update = async (id: number, payload: PaymentPayload) => {
    const response = await updatePayment(id, payload)
    if (response.ok) {
      items.value = sortPayments(items.value.map((item) => (item.id === id ? response.data : item)))
    }
    return response
  }

  const remove = async (id: number) => {
    const response = await deletePayment(id)
    if (response.ok) items.value = items.value.filter((item) => item.id !== id)
    return response
  }

  return { items, isLoading, loadError, load, create, update, remove }
})