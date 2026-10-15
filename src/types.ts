export const STAGES = ['Lead', 'Prospect', 'Qualified', 'Customer'] as const
export type Stage = (typeof STAGES)[number]

export type ViewMode = 'table' | 'board'

export interface Contact {
  id: string
  name: string
  email: string
  company?: string
  role?: string
  owner?: string
  labels: string[]
  stage: Stage
  notes?: string
}

/** the only fields a user can edit from the details panel */
export type EditableFields = Pick<Contact, 'stage' | 'notes'>
