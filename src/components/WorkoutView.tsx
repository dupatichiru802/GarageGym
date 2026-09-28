import { useState } from 'react'
import { MUSCLE_GROUP_LABELS } from '../data/exercises'
import type { WorkoutExercise, WorkoutPlan } from '../lib/generateWorkout'
import { ExerciseAnimation } from './ExerciseAnimation'

interface WorkoutViewProps {
  plan: WorkoutPlan
  onLog: (completedExercises: WorkoutExercise[]) => void
}

export function WorkoutView({ plan, onLog }: WorkoutViewProps) {
  const allExercises = plan.blocks.flatMap((block) => block.exercises)
  const [completed, setCompleted] = useState<Set<string>>(() => new Set(allExercises.map((ex) => ex.id)))
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [logged, setLogged] = useState(false)

  function toggleCompleted(id: string) {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleLog() {
    const done = allExercises.filter((ex) => completed.has(ex.id))
    onLog(done)
    setLogged(true)
  }

  return (
    <div className="workout">
      <section className="workout-section">
        <h3>Warm-up <span className="muted">(~3-5 min)</span></h3>
        <ul className="simple-list">
          {plan.warmup.map((move) => (
            <li key={move}>{move}</li>
          ))}
        </ul>
      </section>

      {plan.blocks.map((block) => (
        <section className="workout-section" key={block.muscleGroup}>
          <h3>{MUSCLE_GROUP_LABELS[block.muscleGroup]}</h3>
          <ul className="exercise-list">
            {block.exercises.map((exercise) => {
              const isDone = completed.has(exercise.id)
              const isOpen = expanded.has(exercise.id)
              return (
                <li key={exercise.id} className={`exercise-card${isDone ? ' done' : ''}`}>
                  <div className="exercise-header">
                    <label className="exercise-title-row">
                      <input
                        type="checkbox"
                        className="exercise-done-checkbox"
                        checked={isDone}
                        onChange={() => toggleCompleted(exercise.id)}
                        aria-label={`Mark ${exercise.name} as done`}
                      />
                      <span className="exercise-name">{exercise.name}</span>
                    </label>
                    <span className="exercise-sets">
                      {exercise.sets} × {exercise.reps}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`howto-toggle${isOpen ? ' open' : ''}`}
                    onClick={() => toggleExpanded(exercise.id)}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? 'Hide how-to' : 'Show how-to'}
                  </button>

                  {isOpen && (
                    <div className="howto-panel">
                      <ExerciseAnimation pattern={exercise.pattern} />
                      <p className="exercise-cue">{exercise.cue}</p>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}

      <section className="workout-section">
        <h3>Rest between sets</h3>
        <p>{plan.restSeconds} seconds</p>
      </section>

      <section className="workout-section">
        <h3>Cool-down <span className="muted">(~3-5 min)</span></h3>
        <ul className="simple-list">
          {plan.cooldown.map((move) => (
            <li key={move}>{move}</li>
          ))}
        </ul>
      </section>

      <section className="workout-section log-panel">
        <button type="button" className="log-button" onClick={handleLog} disabled={completed.size === 0}>
          {logged ? 'Logged ✓ (log again)' : 'Log this workout'}
        </button>
        {logged && <p className="log-confirmation">Saved to your workout history.</p>}
      </section>
    </div>
  )
}
