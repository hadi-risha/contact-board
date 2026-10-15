import type { DragEvent } from 'react'
import type { Contact } from '../types'
import { Avatar } from './Avatar'
import { Labels } from './Labels'

interface ContactCardProps {
  contact: Contact
  selected: boolean
  dragging: boolean
  onOpen: () => void
  onDragStart: (e: DragEvent<HTMLLIElement>) => void
  onDragEnd: () => void
}

export function ContactCard({ contact: c, selected, dragging, onOpen, onDragStart, onDragEnd }: ContactCardProps) {
  const subtitle = [c.role, c.company].filter(Boolean).join(' · ')

  return (
    <li
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`relative rounded-lg border bg-white p-3 shadow-sm transition ${
        selected ? 'border-indigo-400 ring-2 ring-indigo-200' : 'border-slate-200 hover:border-slate-300 hover:shadow'
      } ${dragging ? 'opacity-40' : ''}`}
    >

      <button
        type="button"
        data-focus-id={c.id}
        onClick={onOpen}
        className="block rounded text-left text-sm font-medium text-slate-900 after:absolute after:inset-0 after:rounded-lg after:content-['']"
      >
        {c.name}
      </button>
      <p className="mt-0.5 truncate text-xs text-slate-500">{subtitle || 'No role or company'}</p>
      {c.labels.length > 0 && (
        <div className="mt-2">
          <Labels labels={c.labels} max={2} />
        </div>
      )}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
        {c.owner ? (
          <>
            <Avatar name={c.owner} />
            <span className="truncate">{c.owner}</span>
          </>
        ) : (
          <span className="text-slate-400">Unassigned</span>
        )}
      </div>
    </li>
  )
}
