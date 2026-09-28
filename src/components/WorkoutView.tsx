import { MUSCLE_GROUP_LABELS } from '../data/exercises'
import type { WorkoutPlan } from '../lib/generateWorkout'

interface WorkoutViewProps {
  plan: WorkoutPlan
}

export function WorkoutView({ plan }: WorkoutViewProps) {
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
            {block.exercises.map((exercise) => (
              <li key={exercise.id} className="exercise-card">
                <div className="exercise-header">
                  <span className="exercise-name">{exercise.name}</span>
                  <span className="exercise-sets">
                    {exercise.sets} × {exercise.reps}
                  </span>
                </div>
                <p className="exercise-cue">{exercise.cue}</p>
              </li>
            ))}
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
    </div>
  )
}
