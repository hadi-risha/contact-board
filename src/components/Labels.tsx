interface LabelsProps {
  labels: string[]
  max?: number
}

export function Labels({ labels, max }: LabelsProps) {
  if (labels.length === 0) return <Empty />
  const shown = max ? labels.slice(0, max) : labels
  const hidden = labels.length - shown.length
  return (
    <ul className="flex flex-wrap gap-1" aria-label="Labels">
      {shown.map((l) => (
        <li key={l} className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
          {l}
        </li>
      ))}
      {hidden > 0 && (
        <li className="rounded px-1 py-0.5 text-xs text-slate-500">
          +{hidden}
          <span className="sr-only"> more labels</span>
        </li>
      )}
    </ul>
  )
}

export function Empty({ text = 'Not set' }: { text?: string }) {
  return (
    <>
      <span aria-hidden="true" className="text-slate-300">
        —
      </span>
      <span className="sr-only">{text}</span>
    </>
  )
}
