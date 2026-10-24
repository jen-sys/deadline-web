import { useState } from 'react'
import type { Task } from '../types'
import { countdown, formatDate, getStatus } from '../utils/date'
import s from '../styles/ui.module.css'

interface Props {
  task: Task
  now: number
  onToggle: (id: string) => void
  onEdit: (t: Task) => void
  onDelete: (id: string) => void
}

const STATUS_CLASS = { done: s.stDone, overdue: s.stOverdue, urgent: s.stUrgent, soon: s.stSoon, normal: '' }
const PRIO_CLASS = { rendah: s.pLow, sedang: s.pMid, tinggi: s.pHigh }

export default function TaskCard({ task, now, onToggle, onEdit, onDelete }: Props) {
  const [leaving, setLeaving] = useState(false)
  const status = getStatus(task, now)

  const handleDelete = () => {
    if (!confirm(`Hapus "${task.title}"?`)) return
    setLeaving(true)
    setTimeout(() => onDelete(task.id), 250) // tunggu animasi keluar
  }

  return (
    <article className={`${s.card} ${s.task} ${STATUS_CLASS[status]} ${leaving ? s.leaving : ''}`}>
      <div className={s.taskTop}>
        <input type="checkbox" className={s.check} checked={task.done}
          onChange={() => onToggle(task.id)} aria-label="Tandai selesai" />
        <div className={s.taskMain}>
          <h4 className={task.done ? s.strike : ''}>{task.title}</h4>
          <div className={s.muted}>{task.course}</div>
        </div>
      </div>

      {task.description && <p className={s.desc}>{task.description}</p>}

      <div className={s.badges}>
        <span className={`${s.badge} ${PRIO_CLASS[task.priority]}`}>Prioritas {task.priority}</span>
        <span className={`${s.badge} ${s.badgeStatus}`}>
          {countdown(task, now)}
        </span>
      </div>

      <div className={s.taskFooter}>
        <span className={s.muted}>Deadline {formatDate(task.deadline)}</span>
        <div>
          <button className={s.linkBtn} onClick={() => onEdit(task)}>Edit</button>
          <button className={`${s.linkBtn} ${s.danger}`} onClick={handleDelete}>Hapus</button>
        </div>
      </div>
    </article>
  )
}
