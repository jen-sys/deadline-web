# AwasDeadline ⏰
Pengingat tugas mahasiswa — React 18 + Vite + TypeScript + CSS Modules. Data tersimpan di localStorage.

    npm install
    npm run dev      # development
    npm run build    # production build

## Struktur
    src/
      components/  Header, StatsCards, TaskForm, TaskCard, EmptyState
      pages/       Onboarding, Dashboard
      hooks/       useLocalStorage, useNow
      utils/       date.ts (status, countdown, format tanggal)
      styles/      global.css (tema & variabel), ui.module.css
      types.ts, App.tsx, main.tsx
