import { Issue } from '@/models/Issue'

export type PaginationTypes = {
  reports: Array<Issue>
  totalItemCount: number
  currentPage: number
  pageSize: number
  totalPages: number
}
