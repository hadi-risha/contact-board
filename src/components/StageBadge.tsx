import { STAGE_STYLES } from '../lib/stages'
import type { Stage } from '../types'

export function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STAGE_STYLES[stage].badge}`}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${STAGE_STYLES[stage].dot}`} />
      {stage}
    </span>
  )
}
