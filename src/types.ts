export type Priority = 'rendah' | 'sedang' | 'tinggi'
export type Filter = 'semua' | 'pending' | 'selesai' | 'overdue'

export interface User { name: string; nim: string }

export interface Task {
  id: string
  title: string
  course: string
  description: string
  deadline: string // YYYY-MM-DD
  priority: Priority
  done: boolean
  createdAt: number
}
