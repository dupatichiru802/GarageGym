import { EQUIPMENT_OPTIONS, type EquipmentId } from '../data/equipment'

interface EquipmentPickerProps {
  selected: Set<EquipmentId>
  onToggle: (id: EquipmentId) => void
}

export function EquipmentPicker({ selected, onToggle }: EquipmentPickerProps) {
  return (
    <div className="equipment-grid" role="group" aria-label="Equipment you have">
      {EQUIPMENT_OPTIONS.map((option) => {
        const isSelected = selected.has(option.id)
        return (
          <button
            key={option.id}
            type="button"
            className={`equipment-chip${isSelected ? ' selected' : ''}`}
            aria-pressed={isSelected}
            onClick={() => onToggle(option.id)}
          >
            <span className="equipment-icon" aria-hidden="true">
              {option.icon}
            </span>
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
