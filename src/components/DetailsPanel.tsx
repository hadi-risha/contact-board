import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useContacts } from '../state/ContactsContext'
import { STAGES, type Contact, type Stage } from '../types'
import { Avatar } from './Avatar'
import { Empty, Labels } from './Labels'

interface DetailsPanelProps {
  contact: Contact
  onClose: () => void
}

interface Draft {
  stage?: Stage
  notes?: string
}

export function DetailsPanel({ contact, onClose }: DetailsPanelProps) {
  const { updateContact } = useContacts()
  const [draft, setDraft] = useState<Draft>({})
  const [justSaved, setJustSaved] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const stage = draft.stage ?? contact.stage
  const notes = draft.notes ?? contact.notes ?? ''
  const dirty = stage !== contact.stage || notes.trim() !== (contact.notes ?? '')

  // move focus into the panel when it opens 
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const edit = (patch: Draft) => {
    setDraft((d) => ({ ...d, ...patch }))
    setJustSaved(false)
  }

  const save = () => {
    if (!dirty) return
    updateContact(contact.id, { stage, notes: notes.trim() || undefined })
    setDraft({})
    setJustSaved(true)
  }

  const cancel = () => {
    setDraft({})
    setJustSaved(false)
  }

  const close = () => {
    if (dirty && !window.confirm('Discard your unsaved changes?')) return
    onClose()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      close()
    }
  }

  return (
    <aside
      aria-label={`Details for ${contact.name}`}
      onKeyDown={onKeyDown}
      className="fixed inset-y-0 right-0 z-20 flex w-[400px] max-w-full flex-col border-l border-slate-200 bg-white shadow-2xl xl:static xl:z-auto xl:shadow-none"
    >
      <header className="flex items-start gap-3 border-b border-slate-200 p-4">
        <Avatar name={contact.name} size="md" />
        <div className="min-w-0 flex-1">
          <h2 ref={headingRef} tabIndex={-1} className="truncate text-base font-semibold text-slate-900 outline-none">
            {contact.name}
          </h2>
          <p className="truncate text-sm text-slate-500">
            {[contact.role, contact.company].filter(Boolean).join(' · ') || 'No role or company'}
          </p>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close details"
          className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        <dl className="grid grid-cols-[88px_1fr] gap-x-3 gap-y-3 text-sm">
          <dt className="text-slate-500">Email</dt>
          <dd className="min-w-0 truncate">
            <a href={`mailto:${contact.email}`} className="rounded text-indigo-700 hover:underline">
              {contact.email}
            </a>
          </dd>
          <dt className="text-slate-500">Company</dt>
          <dd>{contact.company ?? <Empty />}</dd>
          <dt className="text-slate-500">Role</dt>
          <dd>{contact.role ?? <Empty />}</dd>
          <dt className="text-slate-500">Owner</dt>
          <dd>{contact.owner ?? <Empty text="Unassigned" />}</dd>
          <dt className="text-slate-500">Labels</dt>
          <dd>
            <Labels labels={contact.labels} />
          </dd>
        </dl>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-800">Stage</legend>
          <div className="grid grid-cols-2 gap-2">
            {STAGES.map((s) => (
              <label key={s} className="relative">
                <input
                  type="radio"
                  name={`stage-${contact.id}`}
                  value={s}
                  checked={stage === s}
                  onChange={() => edit({ stage: s })}
                  className="peer sr-only"
                />
                <span className="block cursor-pointer rounded-md border border-slate-200 px-3 py-2 text-center text-sm text-slate-700 hover:bg-slate-50 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:font-medium peer-checked:text-indigo-800 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-600">
                  {s}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor={`notes-${contact.id}`} className="mb-2 block text-sm font-medium text-slate-800">
            Notes
          </label>
          <textarea
            id={`notes-${contact.id}`}
            value={notes}
            onChange={(e) => edit({ notes: e.target.value })}
            rows={6}
            placeholder="Add context, next steps, anything worth remembering…"
            className="w-full resize-y rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500"
          />
        </div>
      </div>

      <footer className="flex items-center gap-2 border-t border-slate-200 bg-slate-50 p-3">
        <p role="status" aria-live="polite" className="mr-auto text-xs text-slate-500">
          {dirty ? 'Unsaved changes' : justSaved ? 'Saved' : ''}
        </p>
        <button
          type="button"
          onClick={cancel}
          disabled={!dirty}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={save}
          disabled={!dirty}
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          Save
        </button>
      </footer>
    </aside>
  )
}
