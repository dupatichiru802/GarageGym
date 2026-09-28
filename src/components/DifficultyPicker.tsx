import { DIFFICULTY_PROFILES, type Difficulty } from '../lib/generateWorkout'

interface DifficultyPickerProps {
  value: Difficulty
  onChange: (value: Difficulty) => void
}

const DIFFICULTIES = Object.keys(DIFFICULTY_PROFILES) as Difficulty[]

export function DifficultyPicker({ value, onChange }: DifficultyPickerProps) {
  return (
    <div className="difficulty-row" role="group" aria-label="Workout difficulty">
      {DIFFICULTIES.map((difficulty) => (
        <button
          key={difficulty}
          type="button"
          className={`difficulty-chip${value === difficulty ? ' selected' : ''}`}
          aria-pressed={value === difficulty}
          onClick={() => onChange(difficulty)}
        >
          {DIFFICULTY_PROFILES[difficulty].label}
        </button>
      ))}
    </div>
  )
}
