import { useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { User } from './types'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [user, setUser] = useLocalStorage<User | null>('awasdeadline:user', null)
  const [dark, setDark] = useLocalStorage<boolean>('awasdeadline:dark', false)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  const logout = () => {
    if (!confirm('Hapus profil dan semua tugas dari perangkat ini?')) return
    localStorage.removeItem('awasdeadline:user')
    localStorage.removeItem('awasdeadline:tasks')
    setUser(null)
    // reload agar state tugas di memori ikut bersih
    location.reload()
  }

  const toggleDark = () => setDark(d => !d)

  return user
    ? <Dashboard user={user} dark={dark} onToggleDark={toggleDark} onLogout={logout} />
    : <Onboarding dark={dark} onToggleDark={toggleDark} onStart={setUser} />
}
