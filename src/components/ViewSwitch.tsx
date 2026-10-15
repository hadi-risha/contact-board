import type { ViewMode } from '../types'

interface ViewSwitchProps {
  view: ViewMode
  onChange: (view: ViewMode) => void
}

const OPTIONS: { value: ViewMode; label: string; icon: string }[] = [
  { value: 'table', label: 'Table', icon: 'M3 5h18M3 12h18M3 19h18' },
  { value: 'board', label: 'Board', icon: 'M5 4v16M12 4v10M19 4v13' },
]

export function ViewSwitch({ view, onChange }: ViewSwitchProps) {
  return (
    <div role="group" aria-label="Switch view" className="inline-flex rounded-lg bg-slate-100 p-0.5">
      {OPTIONS.map((o) => {
        const active = view === o.value
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d={o.icon} />
            </svg>
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
