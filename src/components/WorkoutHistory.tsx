import { EQUIPMENT_OPTIONS } from '../data/equipment'
import { MUSCLE_GROUP_LABELS } from '../data/exercises'
import { DIFFICULTY_PROFILES } from '../lib/generateWorkout'
import type { WorkoutLogEntry } from '../lib/workoutLog'

interface WorkoutHistoryProps {
  entries: WorkoutLogEntry[]
  onDelete: (id: string) => void
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function startOfWeek(): Date {
  const now = new Date()
  const day = now.getDay()
  const diff = (day + 6) % 7 // Monday-based
  const start = new Date(now)
  start.setHours(0, 0, 0, 0)
  start.setDate(now.getDate() - diff)
  return start
}

function equipmentLabel(ids: string[]): string {
  if (ids.length === 0) return 'Bodyweight only'
  return ids
    .map((id) => EQUIPMENT_OPTIONS.find((option) => option.id === id)?.label ?? id)
    .join(', ')
}

export function WorkoutHistory({ entries, onDelete }: WorkoutHistoryProps) {
  if (entries.length === 0) {
    return <p className="history-empty">No workouts logged yet. Generate one and hit "Log this workout" when you're done.</p>
  }

  const weekStart = startOfWeek()
  const thisWeekCount = entries.filter((entry) => new Date(entry.date) >= weekStart).length

  return (
    <div>
      <div className="history-stats">
        <div className="history-stat">
          <strong>{entries.length}</strong>
          <span>Total logged</span>
        </div>
        <div className="history-stat">
          <strong>{thisWeekCount}</strong>
          <span>This week</span>
        </div>
      </div>

      <div className="history-list">
        {entries.map((entry) => (
          <div className="history-entry" key={entry.id}>
            <div className="history-entry-header">
              <div>
                <div className="history-entry-title">{formatDate(entry.date)}</div>
                <div className="history-entry-meta">
                  {DIFFICULTY_PROFILES[entry.difficulty].label} &middot; {equipmentLabel(entry.equipment)} &middot;{' '}
                  {entry.exercises.length} exercise{entry.exercises.length === 1 ? '' : 's'}
                </div>
              </div>
              <button type="button" className="history-delete" onClick={() => onDelete(entry.id)}>
                Delete
              </button>
            </div>
            <ul className="history-exercise-list">
              {entry.exercises.map((exercise) => (
                <li key={exercise.id}>
                  {exercise.name} ({MUSCLE_GROUP_LABELS[exercise.muscleGroup]}) &mdash; {exercise.sets} × {exercise.reps}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
