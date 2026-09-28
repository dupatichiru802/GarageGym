export type EquipmentId =
  | 'dumbbells'
  | 'barbell'
  | 'bench'
  | 'pull-up-bar'
  | 'resistance-bands'
  | 'kettlebell'
  | 'jump-rope'
  | 'cable-machine'

export interface EquipmentOption {
  id: EquipmentId
  label: string
  icon: string
}

export const EQUIPMENT_OPTIONS: EquipmentOption[] = [
  { id: 'dumbbells', label: 'Dumbbells', icon: '\u{1F3CB}\u{FE0F}' },
  { id: 'barbell', label: 'Barbell', icon: '\u{1F3CB}' },
  { id: 'bench', label: 'Bench', icon: '\u{1FA91}' },
  { id: 'pull-up-bar', label: 'Pull-up bar', icon: '\u{1F938}' },
  { id: 'resistance-bands', label: 'Resistance bands', icon: '\u{1F9F6}' },
  { id: 'kettlebell', label: 'Kettlebell', icon: '\u{1F514}' },
  { id: 'jump-rope', label: 'Jump rope', icon: '\u{1FA80}' },
  { id: 'cable-machine', label: 'Cable machine', icon: '\u{1F3D7}\u{FE0F}' },
]
