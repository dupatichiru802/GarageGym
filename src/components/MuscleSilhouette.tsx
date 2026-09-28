import type { MuscleGroup } from '../data/exercises'

interface MuscleSilhouetteProps {
  group: MuscleGroup
}

export function MuscleSilhouette({ group }: MuscleSilhouetteProps) {
  const isBack = group === 'back'
  const chestOn = group === 'chest' || isBack
  const coreOn = group === 'core' || isBack
  const shouldersOn = group === 'shoulders'
  const armsOn = group === 'arms'
  const legsOn = group === 'legs'

  return (
    <svg className="muscle-silhouette" viewBox="0 0 120 220" role="img" aria-hidden="true">
      {/* legs */}
      <path
        className={`region${legsOn ? ' on' : ''}`}
        d="M46,128 L42,206 L54,206 L58,140 L62,140 L66,206 L78,206 L74,128 Z"
      />
      {/* arms (includes forearm/hand) */}
      <path
        className={`region${armsOn ? ' on' : ''}`}
        d="M40,72 L20,80 L14,132 L24,134 L32,90 L40,110 Z"
      />
      <path
        className={`region${armsOn ? ' on' : ''}`}
        d="M80,72 L100,80 L106,132 L96,134 L88,90 L80,110 Z"
      />
      {/* torso base (neutral, shows through when no torso region is active) */}
      <path className="region" d="M40,68 L80,68 L78,128 L42,128 Z" />
      {/* chest (upper torso) */}
      <path
        className={`region${chestOn ? ' on' : ''}`}
        d="M40,68 L80,68 L79,98 L41,98 Z"
      />
      {/* core (lower torso) */}
      <path
        className={`region${coreOn ? ' on' : ''}`}
        d="M41,98 L79,98 L78,128 L42,128 Z"
      />
      {/* shoulder caps */}
      <circle className={`region${shouldersOn ? ' on' : ''}`} cx="36" cy="70" r="11" />
      <circle className={`region${shouldersOn ? ' on' : ''}`} cx="84" cy="70" r="11" />
      {/* head + neck */}
      <rect className="region" x="54" y="50" width="12" height="14" rx="3" />
      <ellipse className="region" cx="60" cy="34" rx="18" ry="20" />

      {isBack && (
        <g className="rear-view-hint">
          <path d="M60,72 L60,124" />
          <path d="M60,80 Q48,90 46,104" />
          <path d="M60,80 Q72,90 74,104" />
        </g>
      )}
    </svg>
  )
}
