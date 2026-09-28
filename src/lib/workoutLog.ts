import type { EquipmentId } from '../data/equipment'
import type { MuscleGroup } from '../data/exercises'
import type { Difficulty } from './generateWorkout'

const LOG_STORAGE_KEY = 'garagegym.workoutLog'

export interface LoggedExercise {
  id: string
  name: string
  muscleGroup: MuscleGroup
  sets: number
  reps: string
}

export interface WorkoutLogEntry {
  id: string
  date: string
  difficulty: Difficulty
  equipment: EquipmentId[]
  exercises: LoggedExercise[]
}

export function loadWorkoutLog(): WorkoutLogEntry[] {
  try {
    const raw = localStorage.getItem(LOG_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveWorkoutLog(entries: WorkoutLogEntry[]) {
  localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(entries))
}

export function addWorkoutLogEntry(entry: Omit<WorkoutLogEntry, 'id' | 'date'>): WorkoutLogEntry[] {
  const newEntry: WorkoutLogEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: new Date().toISOString(),
  }
  const entries = [newEntry, ...loadWorkoutLog()]
  saveWorkoutLog(entries)
  return entries
}

export function deleteWorkoutLogEntry(id: string): WorkoutLogEntry[] {
  const entries = loadWorkoutLog().filter((entry) => entry.id !== id)
  saveWorkoutLog(entries)
  return entries
}
