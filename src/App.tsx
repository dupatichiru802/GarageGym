import { useEffect, useState } from 'react'
import { DifficultyPicker } from './components/DifficultyPicker'
import { EquipmentPicker } from './components/EquipmentPicker'
import { WorkoutHistory } from './components/WorkoutHistory'
import { WorkoutView } from './components/WorkoutView'
import type { EquipmentId } from './data/equipment'
import { generateWorkout, type Difficulty, type WorkoutExercise, type WorkoutPlan } from './lib/generateWorkout'
import { addWorkoutLogEntry, deleteWorkoutLogEntry, loadWorkoutLog, type WorkoutLogEntry } from './lib/workoutLog'
import './App.css'

const EQUIPMENT_STORAGE_KEY = 'garagegym.equipment'
const DIFFICULTY_STORAGE_KEY = 'garagegym.difficulty'

type Tab = 'generate' | 'history'

function loadEquipment(): EquipmentId[] {
  try {
    const raw = localStorage.getItem(EQUIPMENT_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as EquipmentId[]) : []
  } catch {
    return []
  }
}

function loadDifficulty(): Difficulty {
  try {
    const raw = localStorage.getItem(DIFFICULTY_STORAGE_KEY)
    return raw === 'beginner' || raw === 'intermediate' || raw === 'advanced' ? raw : 'intermediate'
  } catch {
    return 'intermediate'
  }
}

function App() {
  const [equipment, setEquipment] = useState<Set<EquipmentId>>(() => new Set(loadEquipment()))
  const [difficulty, setDifficulty] = useState<Difficulty>(loadDifficulty)
  const [plan, setPlan] = useState<WorkoutPlan | null>(null)
  const [generation, setGeneration] = useState(0)
  const [tab, setTab] = useState<Tab>('generate')
  const [history, setHistory] = useState<WorkoutLogEntry[]>(() => loadWorkoutLog())

  useEffect(() => {
    localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify([...equipment]))
  }, [equipment])

  useEffect(() => {
    localStorage.setItem(DIFFICULTY_STORAGE_KEY, difficulty)
  }, [difficulty])

  function toggleEquipment(id: EquipmentId) {
    setEquipment((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleGenerate() {
    setPlan(generateWorkout([...equipment], difficulty))
    setGeneration((g) => g + 1)
  }

  function handleLogWorkout(completedExercises: WorkoutExercise[]) {
    const updated = addWorkoutLogEntry({
      difficulty,
      equipment: [...equipment],
      exercises: completedExercises.map((ex) => ({
        id: ex.id,
        name: ex.name,
        muscleGroup: ex.muscleGroup,
        sets: ex.sets,
        reps: ex.reps,
      })),
    })
    setHistory(updated)
  }

  function handleDeleteHistoryEntry(id: string) {
    setHistory(deleteWorkoutLogEntry(id))
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>🏋️ GarageGym</h1>
        <p>Pick what you've got. Get a full-body workout built around it.</p>
      </header>

      <main className="page-main">
        <div className="tab-row">
          <button
            type="button"
            className={`tab-button${tab === 'generate' ? ' active' : ''}`}
            onClick={() => setTab('generate')}
          >
            Generate
          </button>
          <button
            type="button"
            className={`tab-button${tab === 'history' ? ' active' : ''}`}
            onClick={() => setTab('history')}
          >
            History ({history.length})
          </button>
        </div>

        {tab === 'generate' ? (
          <>
            <section className="panel">
              <h2>1. What equipment do you have?</h2>
              <p className="muted">No selection needed for bodyweight-only exercises &mdash; those are always included.</p>
              <EquipmentPicker selected={equipment} onToggle={toggleEquipment} />
            </section>

            <section className="panel">
              <h2>2. Choose your difficulty</h2>
              <DifficultyPicker value={difficulty} onChange={setDifficulty} />
            </section>

            <section className="panel generate-panel">
              <button type="button" className="generate-button" onClick={handleGenerate}>
                {plan ? 'Regenerate workout' : 'Generate my workout'}
              </button>
            </section>

            {plan && (
              <section className="panel">
                <h2>Your full-body workout</h2>
                <WorkoutView key={generation} plan={plan} onLog={handleLogWorkout} />
              </section>
            )}
          </>
        ) : (
          <section className="panel">
            <h2>Workout history</h2>
            <WorkoutHistory entries={history} onDelete={handleDeleteHistoryEntry} />
          </section>
        )}
      </main>
    </div>
  )
}

export default App
