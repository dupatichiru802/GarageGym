import type { EquipmentId } from '../data/equipment'
import {
  COOLDOWN_EXERCISES,
  EXERCISES,
  WARMUP_EXERCISES,
  type Exercise,
  type MuscleGroup,
} from '../data/exercises'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface DifficultyProfile {
  label: string
  sets: number
  restSeconds: number
  exercisesPerGroup: number
}

export const DIFFICULTY_PROFILES: Record<Difficulty, DifficultyProfile> = {
  beginner: { label: 'Beginner', sets: 2, restSeconds: 60, exercisesPerGroup: 1 },
  intermediate: { label: 'Intermediate', sets: 3, restSeconds: 45, exercisesPerGroup: 1 },
  advanced: { label: 'Advanced', sets: 4, restSeconds: 30, exercisesPerGroup: 2 },
}

// Legs cover the largest muscles in the body, so they earn an extra exercise.
const MUSCLE_GROUP_ORDER: MuscleGroup[] = ['legs', 'chest', 'back', 'shoulders', 'arms', 'core']
const EXTRA_EXERCISES_FOR: Partial<Record<MuscleGroup, number>> = { legs: 1 }

export interface WorkoutExercise extends Exercise {
  sets: number
}

export interface WorkoutBlock {
  muscleGroup: MuscleGroup
  exercises: WorkoutExercise[]
}

export interface WorkoutPlan {
  warmup: string[]
  cooldown: string[]
  blocks: WorkoutBlock[]
  restSeconds: number
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function isAvailable(exercise: Exercise, ownedEquipment: Set<EquipmentId>): boolean {
  return exercise.equipment.every((item) => ownedEquipment.has(item))
}

export function availableExercisesFor(
  muscleGroup: MuscleGroup,
  equipmentIds: EquipmentId[],
): Exercise[] {
  const owned = new Set(equipmentIds)
  return EXERCISES.filter((ex) => ex.muscleGroup === muscleGroup && isAvailable(ex, owned))
}

export function generateWorkout(equipmentIds: EquipmentId[], difficulty: Difficulty): WorkoutPlan {
  const profile = DIFFICULTY_PROFILES[difficulty]
  const owned = new Set(equipmentIds)

  const blocks: WorkoutBlock[] = MUSCLE_GROUP_ORDER.map((muscleGroup) => {
    const pool = shuffle(EXERCISES.filter((ex) => ex.muscleGroup === muscleGroup && isAvailable(ex, owned)))
    const count = profile.exercisesPerGroup + (EXTRA_EXERCISES_FOR[muscleGroup] ?? 0)
    const picked = pool.slice(0, Math.min(count, pool.length))
    return {
      muscleGroup,
      exercises: picked.map((ex) => ({ ...ex, sets: profile.sets })),
    }
  }).filter((block) => block.exercises.length > 0)

  return {
    warmup: shuffle(WARMUP_EXERCISES).slice(0, 4),
    cooldown: shuffle(COOLDOWN_EXERCISES).slice(0, 3),
    blocks,
    restSeconds: profile.restSeconds,
  }
}

export function totalExerciseCount(plan: WorkoutPlan): number {
  return plan.blocks.reduce((sum, block) => sum + block.exercises.length, 0)
}
