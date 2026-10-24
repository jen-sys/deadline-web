import { useMemo, useState } from 'react'
import type { Filter, Task, User } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useNow } from '../hooks/useNow'
import { deadlineMs, getStatus } from '../utils/date'
import Header from '../components/Header'
import StatsCards from '../components/StatsCards'
import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'
import EmptyState from '../components/EmptyState'
import s from '../styles/ui.module.css'

interface Props { user: User; dark: boolean; onToggleDark: () => void; onLogout: () => void }

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'semua', label: 'Semua' },
  { key: 'pending', label: 'Belum selesai' },
  { key: 'selesai', label: 'Selesai' },
  { key: 'overdue', label: 'Terlambat' },
]

export default function Dashboard({ user, dark, onToggleDark, onLogout }: Props) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('awasdeadline:tasks', [])
  const [filter, setFilter] = useState<Filter>('semua')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const now = useNow()

  const stats = useMemo(() => ({
    total: tasks.length,
    done: tasks.filter(t => t.done).length,
    pending: tasks.filter(t => !t.done).length,
    overdue: tasks.filter(t => getStatus(t, now) === 'overdue').length,
  }), [tasks, now])

  const visible = useMemo(() => {
    return tasks
      .filter(t => {
        if (filter === 'pending') return !t.done
        if (filter === 'selesai') return t.done
        if (filter === 'overdue') return getStatus(t, now) === 'overdue'
        return true
      })
      .sort((a, b) => deadlineMs(a.deadline) - deadlineMs(b.deadline)) // terdekat dulu
  }, [tasks, filter, now])

  const closeForm = () => { setFormOpen(false); setEditing(null) }

  const save = (data: Omit<Task, 'id' | 'done' | 'createdAt'>) => {
    if (editing) {
      setTasks(ts => ts.map(t => (t.id === editing.id ? { ...t, ...data } : t)))
    } else {
      setTasks(ts => [...ts, { ...data, id: crypto.randomUUID(), done: false, createdAt: Date.now() }])
    }
    closeForm()
  }

  const toggle = (id: string) => setTasks(ts => ts.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
  const remove = (id: string) => setTasks(ts => ts.filter(t => t.id !== id))

  return (
    <div className={s.app}>
      <Header user={user} dark={dark} onToggleDark={onToggleDark} onLogout={onLogout} />
      <main className={s.container}>
        <StatsCards {...stats} />

        <div className={s.toolbar}>
          <div className={s.tabs} role="tablist">
            {FILTERS.map(f => (
              <button key={f.key} role="tab" aria-selected={filter === f.key}
                className={`${s.tab} ${filter === f.key ? s.tabActive : ''}`}
                onClick={() => setFilter(f.key)}>{f.label}</button>
            ))}
          </div>
          <button className={s.primaryBtn} onClick={() => setFormOpen(true)}>Tambah tugas</button>
        </div>

        {visible.length === 0 ? (
          <EmptyState filtered={tasks.length > 0} onAdd={() => setFormOpen(true)} />
        ) : (
          <div className={s.grid}>
            {visible.map(t => (
              <TaskCard key={t.id} task={t} now={now} onToggle={toggle} onDelete={remove}
                onEdit={task => { setEditing(task); setFormOpen(true) }} />
            ))}
          </div>
        )}
      </main>

      {formOpen && <TaskForm initial={editing} onSave={save} onCancel={closeForm} />}
    </div>
  )
}
