export type MovementPattern =
  | 'push'
  | 'pull'
  | 'squat'
  | 'hinge'
  | 'lunge'
  | 'plank'
  | 'core'
  | 'twist'
  | 'raise'
  | 'curl'
  | 'jump'

export const PATTERN_LABELS: Record<MovementPattern, string> = {
  push: 'Pushing movement',
  pull: 'Pulling movement',
  squat: 'Squatting movement',
  hinge: 'Hip-hinge movement',
  lunge: 'Lunging movement',
  plank: 'Isometric hold',
  core: 'Core flexion',
  twist: 'Rotational movement',
  raise: 'Raising movement',
  curl: 'Curling movement',
  jump: 'Explosive/cardio movement',
}
