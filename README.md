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

## Running it on Android

There are two ways to get this on an Android phone:

### 1. Install it as an app (works right now, no build tooling needed)

GarageGym is an installable PWA. Open the deployed site in Chrome on Android, tap the
menu, and choose **"Add to Home screen" / "Install app"**. It gets a home-screen icon,
opens full-screen (no browser chrome), and works offline after the first load. This uses
the `vite-plugin-pwa`-generated manifest and service worker — no native build required.

### 2. Build a real native `.apk` (requires Android Studio / the Android SDK)

The repo also has a native Android project (in `android/`), scaffolded with
[Capacitor](https://capacitorjs.com/) — it wraps this same web app in a native shell, so
the how-to animations and everything else work identically. Building the `.apk` needs the
Android SDK (specifically access to Google's Maven repo, `dl.google.com`, to fetch the
Android Gradle Plugin), which isn't available in this project's sandboxed dev environment,
so the APK itself couldn't be produced here. To build it yourself:

```bash
npm run android:build   # builds the web app, syncs it into android/, runs gradlew assembleDebug
# or, with Android Studio installed:
npm run android:open    # builds + syncs, then opens the project in Android Studio
```

The output APK lands at `android/app/build/outputs/apk/debug/app-debug.apk`. Any change to
`src/` needs `npm run android:sync` (or `android:build`/`android:open`) before it shows up
in the native app, since Capacitor bundles a snapshot of `dist/` into the native project.

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
