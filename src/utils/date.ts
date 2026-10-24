import type { Task } from '../types'

export type Status = 'done' | 'overdue' | 'urgent' | 'soon' | 'normal'

const HOUR = 3600_000
const DAY = 24 * HOUR

// Deadline dianggap berakhir pada 23:59:59 di tanggal yang dipilih
export const deadlineMs = (d: string) => new Date(`${d}T23:59:59`).getTime()

export function getStatus(t: Task, now: number): Status {
  if (t.done) return 'done'
  const diff = deadlineMs(t.deadline) - now
  if (diff < 0) return 'overdue'
  if (diff < DAY) return 'urgent'
  if (diff < 3 * DAY) return 'soon'
  return 'normal'
}

export function countdown(t: Task, now: number): string {
  if (t.done) return 'Selesai'
  const diff = deadlineMs(t.deadline) - now
  const abs = Math.abs(diff)
  const days = Math.floor(abs / DAY)
  const hours = Math.floor(abs / HOUR)
  const mins = Math.max(1, Math.floor(abs / 60_000))
  const text = days >= 1 ? `${days} hari` : hours >= 1 ? `${hours} jam` : `${mins} menit`
  return diff < 0 ? `Terlambat ${text}` : `${text} lagi`
}

export const formatDate = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString('id-ID', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  })

export const todayISO = () => {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}
