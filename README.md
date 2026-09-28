# GarageGym

Pick the equipment you actually have, and get a full-body workout built around it.

## What it does

- Select from common home/garage-gym equipment (dumbbells, barbell, bench, pull-up bar,
  resistance bands, kettlebell, jump rope, cable machine) — or select nothing for a fully
  bodyweight workout.
- Choose a difficulty (Beginner / Intermediate / Advanced), which sets the number of sets,
  rest time, and exercise volume.
- Generate a full-body session covering legs, chest, back, shoulders, arms, and core, using
  only exercises that match your selected equipment, plus a warm-up and cool-down.
- Hit "Regenerate" for a fresh mix of exercises any time.
- Your equipment and difficulty choices are remembered locally between visits.
- Each exercise has a "Show how-to" toggle with a looping animated diagram of its movement
  pattern (squat, push, pull, hinge, etc.) plus a form cue.
- Check off exercises as you complete them and hit "Log this workout" to save it to your
  workout history (stored locally), with stats and a delete option per entry.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run lint     # lint with oxlint
```

## Project structure

- `src/data/equipment.ts` — the list of selectable equipment.
- `src/data/exercises.ts` — the exercise database (muscle group, required equipment, sets/reps, movement pattern).
- `src/data/movementPatterns.ts` — the movement-pattern types used to pick a how-to animation.
- `src/lib/generateWorkout.ts` — the workout generation logic.
- `src/lib/workoutLog.ts` — localStorage-backed workout history (add/delete entries).
- `src/components/` — UI components (equipment picker, difficulty picker, workout display,
  exercise how-to animation, workout history).
