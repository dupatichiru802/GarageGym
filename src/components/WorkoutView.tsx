import { useState } from 'react'
import { MUSCLE_GROUP_LABELS } from '../data/exercises'
import type { WorkoutExercise, WorkoutPlan } from '../lib/generateWorkout'
import { ExerciseAnimation } from './ExerciseAnimation'
import { WorkoutSession } from './WorkoutSession'

interface WorkoutViewProps {
  plan: WorkoutPlan
  onLog: (completedExercises: WorkoutExercise[]) => void
}

export function WorkoutView({ plan, onLog }: WorkoutViewProps) {
  const allExercises = plan.blocks.flatMap((block) => block.exercises)
  const [completed, setCompleted] = useState<Set<string>>(() => new Set())
  const [logged, setLogged] = useState(false)
  const [sessionActive, setSessionActive] = useState(false)

  function toggleCompleted(id: string) {
    setCompleted((prev) => {
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

  function handleSessionComplete(sessionCompleted: WorkoutExercise[]) {
    onLog(sessionCompleted)
    setLogged(true)
  }

  return (
    <div className="workout">
      {sessionActive && (
        <WorkoutSession
          exercises={allExercises}
          restSeconds={plan.restSeconds}
          onExit={() => setSessionActive(false)}
          onComplete={handleSessionComplete}
        />
      )}

      <section className="workout-section log-panel">
        <button type="button" className="start-button" onClick={() => setSessionActive(true)}>
          {'▶'} Start workout
        </button>
        <p className="muted">Or check off exercises below and log them yourself.</p>
      </section>

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
              return (
                <li key={exercise.id} className={`exercise-row${isDone ? ' done' : ''}`}>
                  <ExerciseAnimation pattern={exercise.pattern} />
                  <div className="exercise-row-info">
                    <span className="exercise-name">{exercise.name}</span>
                    <span className="exercise-sets">
                      {exercise.sets} × {exercise.reps}
                    </span>
                    <span className="exercise-cue">{exercise.cue}</span>
                  </div>
                  <input
                    type="checkbox"
                    className="exercise-done-checkbox"
                    checked={isDone}
                    onChange={() => toggleCompleted(exercise.id)}
                    aria-label={`Mark ${exercise.name} as done`}
                  />
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
