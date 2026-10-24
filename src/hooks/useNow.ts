import { useEffect, useState } from 'react'

// Mengembalikan waktu sekarang dan update otomatis -> countdown real-time
export function useNow(intervalMs = 30_000) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}
