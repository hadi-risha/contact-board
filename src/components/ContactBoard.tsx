import { useState, type DragEvent } from 'react'
import { STAGE_STYLES } from '../lib/stages'
import { useContacts } from '../state/ContactsContext'
import { STAGES, type Stage } from '../types'
import { ContactCard } from './ContactCard'

export function ContactBoard() {
  const { contacts, selectedId, select, updateContact } = useContacts()
  const [dragId, setDragId] = useState<string | null>(null)
  const [overStage, setOverStage] = useState<Stage | null>(null)

  const handleDrop = (e: DragEvent<HTMLElement>, stage: Stage) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (id) updateContact(id, { stage })
    setDragId(null)
    setOverStage(null)
  }

  return (
    <div className="flex min-h-full gap-4 overflow-x-auto pb-2">
      {STAGES.map((stage) => {
        const items = contacts.filter((c) => c.stage === stage)
        const isOver = overStage === stage && dragId !== null
        return (
          <section
            key={stage}
            aria-labelledby={`col-${stage}`}
            onDragOver={(e) => {
              e.preventDefault()
              setOverStage(stage)
            }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOverStage(null)
            }}
            onDrop={(e) => handleDrop(e, stage)}
            className={`flex min-w-[240px] flex-1 flex-col rounded-xl p-2 transition-colors ${
              isOver ? 'bg-indigo-50 ring-2 ring-indigo-300' : 'bg-slate-100/70'
            }`}
          >
            <header className="flex items-center gap-2 px-1.5 py-1.5">
              <span aria-hidden="true" className={`size-2 rounded-full ${STAGE_STYLES[stage].dot}`} />
              <h2 id={`col-${stage}`} className="text-sm font-semibold text-slate-700">
                {stage}
              </h2>
              <span className="rounded-full bg-white px-1.5 text-xs text-slate-500">
                {items.length}
                <span className="sr-only"> contacts</span>
              </span>
            </header>

            {items.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {items.map((c) => (
                  <ContactCard
                    key={c.id}
                    contact={c}
                    selected={c.id === selectedId}
                    dragging={c.id === dragId}
                    onOpen={() => select(c.id)}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', c.id)
                      e.dataTransfer.effectAllowed = 'move'
                      setDragId(c.id)
                    }}
                    onDragEnd={() => {
                      setDragId(null)
                      setOverStage(null)
                    }}
                  />
                ))}
              </ul>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-500">
                No contacts in {stage} yet.
                <br />
                Drag a card here, or change a stage in the details panel.
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
