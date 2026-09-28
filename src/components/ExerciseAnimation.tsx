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
      <line className="floor" x1="8" y1="112" x2="92" y2="112" />
      <g className="figure">
        <g className="lower-body">
          <path className="limb leg leg-left" d="M44,68 L42,88 L40,108" />
          <path className="limb leg leg-right" d="M56,68 L58,88 L60,108" />
        </g>
        <g className="upper-body">
          <line className="limb torso" x1="50" y1="27" x2="50" y2="68" />
          <path className="limb arm arm-left" d="M38,27 L30,46 L26,64" />
          <path className="limb arm arm-right" d="M62,27 L70,46 L74,64" />
          <circle className="head" cx="50" cy="16" r="9" />
        </g>
      </g>
    </svg>
  )
}
