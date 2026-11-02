export interface Column<T> {
  key: string
  header: string
  value: (item: T) => string
  emphasis?: boolean
  cellClass?: (item: T) => string | undefined
}