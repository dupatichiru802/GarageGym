import { useEffect, useState } from 'react'
import { DifficultyPicker } from './components/DifficultyPicker'
import { EquipmentPicker } from './components/EquipmentPicker'
import { WorkoutView } from './components/WorkoutView'
import type { EquipmentId } from './data/equipment'
import { generateWorkout, type Difficulty, type WorkoutPlan } from './lib/generateWorkout'
import './App.css'

const EQUIPMENT_STORAGE_KEY = 'garagegym.equipment'
const DIFFICULTY_STORAGE_KEY = 'garagegym.difficulty'

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
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>🏋️ GarageGym</h1>
        <p>Pick what you've got. Get a full-body workout built around it.</p>
      </header>

      <main className="page-main">
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
            <WorkoutView plan={plan} />
          </section>
        )}
      </main>
    </div>
  )
}

export default App
