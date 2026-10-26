import { http } from '@/shared/api'

export const deleteCategory = (id: number) =>
  http.fetchFull<void>({
    url: `/categories/${id}`,
    method: 'DELETE',
  })
