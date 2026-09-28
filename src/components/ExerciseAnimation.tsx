import type { MovementPattern } from '../data/movementPatterns'
import { PATTERN_LABELS } from '../data/movementPatterns'

interface ExerciseAnimationProps {
  pattern: MovementPattern
}

export function ExerciseAnimation({ pattern }: ExerciseAnimationProps) {
  return (
    <svg
      className={`exercise-anim pattern-${pattern}`}
      viewBox="0 0 100 130"
      role="img"
      aria-label={`Looping animation demonstrating a ${PATTERN_LABELS[pattern].toLowerCase()}`}
    >
      <g className="figure">
        <g className="lower-body">
          <line className="limb leg leg-left" x1="50" y1="70" x2="38" y2="108" />
          <line className="limb leg leg-right" x1="50" y1="70" x2="62" y2="108" />
        </g>
        <g className="upper-body">
          <line className="limb torso" x1="50" y1="28" x2="50" y2="70" />
          <line className="limb arm arm-left" x1="50" y1="35" x2="32" y2="52" />
          <line className="limb arm arm-right" x1="50" y1="35" x2="68" y2="52" />
          <circle className="head" cx="50" cy="18" r="9" />
        </g>
      </g>
    </svg>
  )
}
