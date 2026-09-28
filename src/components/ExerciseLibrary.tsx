import { EQUIPMENT_OPTIONS } from '../data/equipment'
import { EXERCISES, MUSCLE_GROUP_LABELS, type MuscleGroup } from '../data/exercises'
import { ExerciseAnimation } from './ExerciseAnimation'
import { MuscleSilhouette } from './MuscleSilhouette'

const GROUP_ORDER: MuscleGroup[] = ['chest', 'back', 'shoulders', 'arms', 'legs', 'core']
const REFERENCE_SETS = 3

function equipmentLabel(id: string): string {
  return EQUIPMENT_OPTIONS.find((option) => option.id === id)?.label ?? id
}

export function ExerciseLibrary() {
  return (
    <div className="library">
      {GROUP_ORDER.map((group) => {
        const exercises = EXERCISES.filter((ex) => ex.muscleGroup === group)
        return (
          <section className="library-card" key={group}>
            <div className="library-card-header">
              <MuscleSilhouette group={group} />
              <div>
                <h3>{MUSCLE_GROUP_LABELS[group]}</h3>
                <p className="muted">
                  {exercises.length} exercise{exercises.length === 1 ? '' : 's'}
                  {group === 'back' ? ' · rear view' : ''}
                </p>
              </div>
            </div>

            <div className="library-grid">
              {exercises.map((exercise) => (
                <div className="library-tile" key={exercise.id}>
                  <ExerciseAnimation pattern={exercise.pattern} />
                  <span className="library-tile-name">{exercise.name}</span>
                  <span className="library-tile-sets">
                    {REFERENCE_SETS} × {exercise.reps}
                  </span>
                  <span className="library-tile-equipment">
                    {exercise.equipment.length === 0 ? 'Bodyweight' : exercise.equipment.map(equipmentLabel).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
