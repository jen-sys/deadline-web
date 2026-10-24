import type { User } from '../types'
import s from '../styles/ui.module.css'

interface Props { user: User; dark: boolean; onToggleDark: () => void; onLogout: () => void }

export default function Header({ user, dark, onToggleDark, onLogout }: Props) {
  return (
    <header className={s.header}>
      <div className={s.headerInner}>
        <div>
          <div className={s.brandSmall}>AwasDeadline</div>
          <h2 className={s.greeting}>Halo, {user.name} <span className={s.muted}>({user.nim})</span></h2>
        </div>
        <div className={s.headerActions}>
          <button className={s.iconBtn} onClick={onToggleDark} aria-label="Ganti tema">{dark ? 'Terang' : 'Gelap'}</button>
          <button className={s.ghostBtn} onClick={onLogout}>Keluar</button>
        </div>
      </div>
    </header>
  )
}
