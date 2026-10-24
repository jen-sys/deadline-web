import { useState, type FormEvent } from 'react'
import type { User } from '../types'
import s from '../styles/ui.module.css'

interface Props { dark: boolean; onToggleDark: () => void; onStart: (u: User) => void }

export default function Onboarding({ dark, onToggleDark, onStart }: Props) {
  const [name, setName] = useState('')
  const [nim, setNim] = useState('')
  const [errors, setErrors] = useState<{ name?: string; nim?: string }>({})

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const err: typeof errors = {}
    if (!name.trim()) err.name = 'Nama harus diisi'
    if (!nim.trim()) err.nim = 'NIM harus diisi'
    else if (!/^\d+$/.test(nim.trim())) err.nim = 'NIM hanya boleh angka'
    setErrors(err)
    if (Object.keys(err).length === 0) onStart({ name: name.trim(), nim: nim.trim() })
  }

  return (
    <div className={s.onboard}>
      <button className={s.iconBtn} style={{ position: 'absolute', top: 16, right: 16 }}
        onClick={onToggleDark} aria-label="Ganti tema">{dark ? 'Terang' : 'Gelap'}</button>
      <form className={`${s.card} ${s.onboardCard}`} onSubmit={submit} noValidate>
        <h1 className={s.brand}>AwasDeadline</h1>
        <p className={s.muted}>Catat tugas kuliah dan pantau deadline-nya.</p>

        <label className={s.field}>
          <span>Nama lengkap</span>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Budi Santoso" />
          {errors.name && <small className={s.error}>{errors.name}</small>}
        </label>

        <label className={s.field}>
          <span>NIM</span>
          <input value={nim} inputMode="numeric" onChange={e => setNim(e.target.value)} placeholder="2210512001" />
          {errors.nim && <small className={s.error}>{errors.nim}</small>}
        </label>

        <button className={s.primaryBtn} type="submit">Mulai</button>
      </form>
    </div>
  )
}
