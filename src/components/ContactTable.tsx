import { useContacts } from '../state/ContactsContext'
import { Avatar } from './Avatar'
import { Empty, Labels } from './Labels'
import { StageBadge } from './StageBadge'

const COLUMNS = ['Name', 'Company', 'Role', 'Email', 'Owner', 'Labels', 'Stage']

export function ContactTable() {
  const { contacts, selectedId, select } = useContacts()

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[780px] border-collapse text-left text-sm">
        <caption className="sr-only">Contacts. Select a name to open its details.</caption>
        <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
          <tr>
            {COLUMNS.map((c) => (
              <th key={c} scope="col" className="whitespace-nowrap border-b border-slate-200 px-3 py-2.5">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {contacts.map((c) => {
            const selected = c.id === selectedId
            return (
              <tr
                key={c.id}
                aria-current={selected ? 'true' : undefined}
                onClick={() => select(c.id)}
                className={`cursor-pointer transition-colors ${selected ? 'bg-indigo-50' : 'hover:bg-slate-50'}`}
              >
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={c.name} />
                    <button
                      type="button"
                      data-focus-id={c.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        select(c.id)
                      }}
                      className="whitespace-nowrap rounded font-medium text-slate-900 hover:underline"
                    >
                      {c.name}
                    </button>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-slate-700">{c.company ?? <Empty />}</td>
                <td className="whitespace-nowrap px-3 py-2 text-slate-600">{c.role ?? <Empty />}</td>
                <td className="px-3 py-2">
                  <a
                    href={`mailto:${c.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="whitespace-nowrap rounded text-slate-600 hover:text-indigo-700 hover:underline"
                  >
                    {c.email}
                  </a>
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-slate-600">{c.owner ?? <Empty text="Unassigned" />}</td>
                <td className="px-3 py-2">
                  <Labels labels={c.labels} max={2} />
                </td>
                <td className="px-3 py-2">
                  <StageBadge stage={c.stage} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
