export interface ApiResponse<T> {
  success: boolean
  status: number
  message: string
  data?: T
}

export interface PaginationMeta {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage?: number
  previousPage?: number
}

export interface PaginatedData<T> {
  meta: PaginationMeta
  items: T[]
}
