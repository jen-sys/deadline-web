import s from '../styles/ui.module.css'

export default function EmptyState({ filtered, onAdd }: { filtered: boolean; onAdd: () => void }) {
  return (
    <div className={s.empty}>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="14" y="10" width="36" height="44" rx="4" />
        <path d="M22 24h20M22 32h20M22 40h12" />
      </svg>
      <h3>{filtered ? 'Tidak ada tugas yang cocok' : 'Belum ada tugas'}</h3>
      <p>{filtered ? 'Coba pilih filter lain.' : 'Tugas yang kamu tambahkan akan muncul di sini.'}</p>
      {!filtered && <button className={s.primaryBtn} onClick={onAdd}>Tambah tugas</button>}
    </div>
  )
}
