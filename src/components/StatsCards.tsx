import s from '../styles/ui.module.css'

interface Props { total: number; done: number; pending: number; overdue: number }

export default function StatsCards({ total, done, pending, overdue }: Props) {
  const items = [
    { label: 'Total', value: total, cls: '' },
    { label: 'Selesai', value: done, cls: s.statGreen },
    { label: 'Belum selesai', value: pending, cls: s.statYellow },
    { label: 'Terlambat', value: overdue, cls: s.statRed },
  ]
  return (
    <section className={s.stats}>
      {items.map(i => (
        <div key={i.label} className={`${s.card} ${s.stat} ${i.cls}`}>
          <div className={s.statValue}>{i.value}</div>
          <div className={s.statLabel}>{i.label}</div>
        </div>
      ))}
    </section>
  )
}
