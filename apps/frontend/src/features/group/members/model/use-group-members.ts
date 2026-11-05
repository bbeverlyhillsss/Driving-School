import { computed, onMounted, ref } from 'vue'
import { StudentStatus } from '@driving-school/shared'
import type { SharedGroup, SharedGroupMember } from '@driving-school/shared'
import { addGroupMember, getGroupMembers, removeGroupMember, useGroupStore } from '@/entities/group'
import { useStudentStore } from '@/entities/student'

export const useGroupMembers = (group: SharedGroup, canManage: boolean) => {
  const groupStore = useGroupStore()
  const studentStore = useStudentStore()

  const members = ref<SharedGroupMember[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)
  const actionError = ref<string | null>(null)
  const selectedStudentId = ref('')
  const isAdding = ref(false)
  const removingId = ref<number | null>(null)

  const isEnded = group.endDate < new Date().toLocaleDateString('sv-SE')

  const availableStudents = computed(() =>
    studentStore.items.filter(
      (student) => student.group === null && student.status === StudentStatus.ACTIVE,
    ),
  )

  const syncCount = (): void => groupStore.setStudentsCount(group.id, members.value.length)

  const load = async (): Promise<void> => {
    isLoading.value = true
    loadError.value = null

    const response = await getGroupMembers(group.id)
    isLoading.value = false

    if (!response.ok) {
      loadError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    members.value = response.data
    syncCount()
  }

  const add = async (): Promise<void> => {
    const studentId = Number(selectedStudentId.value)
    if (!studentId) return

    actionError.value = null
    isAdding.value = true
    const response = await addGroupMember(group.id, { studentId })
    isAdding.value = false

    if (!response.ok) {
      actionError.value = response.error?.message ?? 'Server is unavailable'
      void studentStore.load()
      return
    }

    members.value = [...members.value, response.data].sort((a, b) =>
      a.fullName.localeCompare(b.fullName),
    )
    studentStore.setGroup(studentId, { id: group.id, name: group.name })
    selectedStudentId.value = ''
    syncCount()
  }

  const remove = async (studentId: number): Promise<void> => {
    actionError.value = null
    removingId.value = studentId
    const response = await removeGroupMember(group.id, studentId)
    removingId.value = null

    if (!response.ok) {
      actionError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    members.value = members.value.filter((member) => member.id !== studentId)
    studentStore.setGroup(studentId, null)
    syncCount()
  }

  onMounted(() => {
    void load()
    if (canManage) void studentStore.load()
  })

  return {
    members,
    isLoading,
    loadError,
    actionError,
    selectedStudentId,
    isAdding,
    removingId,
    isEnded,
    availableStudents,
    add,
    remove,
  }
}
