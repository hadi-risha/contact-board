import { useCallback } from 'react'
import { ContactBoard } from './components/ContactBoard'
import { ContactTable } from './components/ContactTable'
import { DetailsPanel } from './components/DetailsPanel'
import { ViewSwitch } from './components/ViewSwitch'
import { useContacts } from './state/ContactsContext'

export default function App() {
  const { contacts, view, selectedId, setView, select } = useContacts()
  const selected = contacts.find((c) => c.id === selectedId) ?? null

  const closePanel = useCallback(() => {
    const id = selectedId
    select(null)
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[data-focus-id="${id}"]`)?.focus()
    })
  }, [selectedId, select])

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold">Contacts</h1>
            <p className="text-sm text-slate-500">{contacts.length} people</p>
          </div>
          <ViewSwitch view={view} onChange={setView} />
        </header>

        <main className="min-h-0 flex-1 overflow-auto p-6">
          {view === 'table' ? <ContactTable /> : <ContactBoard />}
        </main>
      </div>

      {selected && <DetailsPanel key={selected.id} contact={selected} onClose={closePanel} />}
    </div>
  )
}
