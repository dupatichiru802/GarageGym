import { useCallback, useEffect, useState } from 'react'
import { MUSCLE_GROUP_LABELS } from '../data/exercises'
import type { WorkoutExercise } from '../lib/generateWorkout'
import { ExerciseAnimation } from './ExerciseAnimation'

interface WorkoutSessionProps {
  exercises: WorkoutExercise[]
  restSeconds: number
  onExit: () => void
  onComplete: (completed: WorkoutExercise[]) => void
}

type Phase = 'exercise' | 'rest' | 'done'

function parseDurationSeconds(reps: string): number | null {
  const match = reps.match(/(\d+)(?:-(\d+))?\s*(sec|min)/i)
  if (!match) return null
  const value = match[2] ? Number(match[2]) : Number(match[1])
  return match[3].toLowerCase().startsWith('min') ? value * 60 : value
}

export function WorkoutSession({ exercises, restSeconds, onExit, onComplete }: WorkoutSessionProps) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('exercise')
  const [secondsLeft, setSecondsLeft] = useState<number | null>(() => parseDurationSeconds(exercises[0]?.reps ?? ''))
  const [completed, setCompleted] = useState<WorkoutExercise[]>([])

  const current = exercises[index]
  const isLast = index === exercises.length - 1

  const handleExerciseDone = useCallback(() => {
    const next = [...completed, current]
    setCompleted(next)
    if (isLast) {
      setPhase('done')
      onComplete(next)
      return
    }
    setPhase('rest')
    setSecondsLeft(restSeconds)
  }, [completed, current, isLast, onComplete, restSeconds])

  const handleRestDone = useCallback(() => {
    const nextIndex = index + 1
    setIndex(nextIndex)
    setPhase('exercise')
    setSecondsLeft(parseDurationSeconds(exercises[nextIndex].reps))
  }, [exercises, index])

  useEffect(() => {
    if (phase === 'done' || secondsLeft === null) return
    if (secondsLeft <= 0) {
      if (phase === 'exercise') handleExerciseDone()
      else handleRestDone()
      return
    }
    const timer = setTimeout(() => setSecondsLeft((s) => (s ?? 1) - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft, phase, handleExerciseDone, handleRestDone])

  if (!current) return null

  if (phase === 'done') {
    return (
      <div className="session-overlay">
        <div className="session-done">
          <span className="session-done-icon">🎉</span>
          <h2>Workout complete!</h2>
          <p className="muted">
            {completed.length} exercise{completed.length === 1 ? '' : 's'} logged to your history.
          </p>
          <button type="button" className="generate-button" onClick={onExit}>
            Done
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'rest') {
    const next = exercises[index + 1]
    return (
      <div className="session-overlay">
        <div className="session-header">
          <button type="button" className="session-exit" onClick={onExit} aria-label="Exit workout">
            ✕
          </button>
          <span className="session-progress">
            {index + 1} / {exercises.length}
          </span>
        </div>
        <div className="session-body session-rest">
          <span className="session-rest-label">Rest</span>
          <span className="session-timer">{secondsLeft}</span>
          {next && <p className="muted">Up next: {next.name}</p>}
          <button type="button" className="generate-button" onClick={handleRestDone}>
            Skip rest
          </button>
        </div>
      </div>
    )
  }

  const isTimed = secondsLeft !== null

  return (
    <div className="session-overlay">
      <div className="session-header">
        <button type="button" className="session-exit" onClick={onExit} aria-label="Exit workout">
          ✕
        </button>
        <span className="session-progress">
          {index + 1} / {exercises.length}
        </span>
      </div>
      <div className="session-body">
        <span className="session-muscle">{MUSCLE_GROUP_LABELS[current.muscleGroup]}</span>
        <h2 className="session-name">{current.name}</h2>
        <div className="session-anim-wrap">
          <ExerciseAnimation pattern={current.pattern} />
        </div>
        {isTimed ? (
          <span className="session-timer">{secondsLeft}</span>
        ) : (
          <span className="session-target">
            {current.sets} × {current.reps}
          </span>
        )}
        <p className="session-cue">{current.cue}</p>
        <button type="button" className="generate-button" onClick={handleExerciseDone}>
          {isTimed ? 'Skip' : 'Done, next exercise'}
        </button>
      </div>
    </div>
  )
}
