import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react'
import { INITIAL_CONTACTS } from '../data/contacts'
import type { Contact, EditableFields, ViewMode } from '../types'

interface State {
  contacts: Contact[]
  view: ViewMode
  selectedId: string | null
}

type Action =
  | { type: 'setView'; view: ViewMode }
  | { type: 'select'; id: string | null }
  | { type: 'update'; id: string; patch: Partial<EditableFields> }

const initialState: State = {
  contacts: INITIAL_CONTACTS,
  view: 'table',
  selectedId: null,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setView':
      return { ...state, view: action.view }
    case 'select':
      return { ...state, selectedId: action.id }
    case 'update':
      // 1 array, 1 record per id so both views read from this and they can never diverge
      return {
        ...state,
        contacts: state.contacts.map((c) => (c.id === action.id ? { ...c, ...action.patch } : c)),
      }
  }
}

interface ContactsValue extends State {
  setView: (view: ViewMode) => void
  select: (id: string | null) => void
  updateContact: (id: string, patch: Partial<EditableFields>) => void
}

const ContactsContext = createContext<ContactsValue | null>(null)

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const actions = useMemo(
    () => ({
      setView: (view: ViewMode) => dispatch({ type: 'setView', view }),
      select: (id: string | null) => dispatch({ type: 'select', id }),
      updateContact: (id: string, patch: Partial<EditableFields>) =>
        dispatch({ type: 'update', id, patch }),
    }),
    [],
  )

  const value = useMemo(() => ({ ...state, ...actions }), [state, actions])
  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>
}

export function useContacts(): ContactsValue {
  const ctx = useContext(ContactsContext)
  if (!ctx) throw new Error('useContacts must be used inside <ContactsProvider>')
  return ctx
}
