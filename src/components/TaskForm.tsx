import { useState, type FormEvent } from 'react'
import type { Priority, Task } from '../types'
import { todayISO } from '../utils/date'
import s from '../styles/ui.module.css'

type Data = Omit<Task, 'id' | 'done' | 'createdAt'>
interface Props { initial: Task | null; onSave: (d: Data) => void; onCancel: () => void }

export default function TaskForm({ initial, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [course, setCourse] = useState(initial?.course ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [deadline, setDeadline] = useState(initial?.deadline ?? todayISO())
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? 'sedang')
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !course.trim() || !deadline) {
      setError('Judul, mata kuliah, dan deadline harus diisi')
      return
    }
    onSave({ title: title.trim(), course: course.trim(), description: description.trim(), deadline, priority })
  }

  return (
    <div className={s.overlay} onMouseDown={e => e.target === e.currentTarget && onCancel()}>
      <form className={`${s.card} ${s.modal}`} onSubmit={submit} noValidate>
        <h3>{initial ? 'Edit tugas' : 'Tambah tugas'}</h3>

        <label className={s.field}><span>Judul</span>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Laporan praktikum 3" autoFocus /></label>

        <label className={s.field}><span>Mata kuliah</span>
          <input value={course} onChange={e => setCourse(e.target.value)} placeholder="Basis Data" /></label>

        <label className={s.field}><span>Catatan (opsional)</span>
          <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} /></label>

        <div className={s.row}>
          <label className={s.field}><span>Deadline</span>
            <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} /></label>
          <label className={s.field}><span>Prioritas</span>
            <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
              <option value="rendah">Rendah</option>
              <option value="sedang">Sedang</option>
              <option value="tinggi">Tinggi</option>
            </select></label>
        </div>

        {error && <small className={s.error}>{error}</small>}
        <div className={s.modalActions}>
          <button type="button" className={s.ghostBtn} onClick={onCancel}>Batal</button>
          <button type="submit" className={s.primaryBtn}>{initial ? 'Simpan' : 'Tambah'}</button>
        </div>
      </form>
    </div>
  )
}
