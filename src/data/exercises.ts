import type { EquipmentId } from './equipment'

export type MuscleGroup = 'chest' | 'back' | 'shoulders' | 'legs' | 'arms' | 'core'

export interface Exercise {
  id: string
  name: string
  muscleGroup: MuscleGroup
  /** Equipment required to perform this exercise. Empty array = bodyweight only. */
  equipment: EquipmentId[]
  reps: string
  cue: string
}

export const MUSCLE_GROUP_LABELS: Record<MuscleGroup, string> = {
  chest: 'Chest',
  back: 'Back',
  shoulders: 'Shoulders',
  legs: 'Legs',
  arms: 'Arms',
  core: 'Core',
}

export const EXERCISES: Exercise[] = [
  // ---- Chest ----
  { id: 'pushup', name: 'Push-ups', muscleGroup: 'chest', equipment: [], reps: '10-15', cue: 'Keep your body in a straight line from head to heels.' },
  { id: 'incline-pushup', name: 'Incline push-ups', muscleGroup: 'chest', equipment: ['bench'], reps: '12-15', cue: 'Hands on the bench, easier variant of a push-up.' },
  { id: 'decline-pushup', name: 'Decline push-ups', muscleGroup: 'chest', equipment: ['bench'], reps: '8-12', cue: 'Feet elevated on the bench for extra upper-chest work.' },
  { id: 'db-bench-press', name: 'Dumbbell bench press', muscleGroup: 'chest', equipment: ['dumbbells', 'bench'], reps: '8-12', cue: 'Lower with control until elbows reach bench level.' },
  { id: 'db-floor-press', name: 'Dumbbell floor press', muscleGroup: 'chest', equipment: ['dumbbells'], reps: '10-12', cue: 'Lie on the floor, press dumbbells up until arms lock out.' },
  { id: 'barbell-bench-press', name: 'Barbell bench press', muscleGroup: 'chest', equipment: ['barbell', 'bench'], reps: '6-10', cue: 'Grip slightly wider than shoulders, control the descent.' },
  { id: 'db-fly', name: 'Dumbbell chest fly', muscleGroup: 'chest', equipment: ['dumbbells', 'bench'], reps: '10-12', cue: 'Slight elbow bend, squeeze at the top.' },
  { id: 'cable-crossover', name: 'Cable crossover', muscleGroup: 'chest', equipment: ['cable-machine'], reps: '10-15', cue: 'Bring hands together in front of your chest, squeeze.' },
  { id: 'band-chest-press', name: 'Resistance band chest press', muscleGroup: 'chest', equipment: ['resistance-bands'], reps: '12-15', cue: 'Anchor band behind you, press forward at chest height.' },
  { id: 'diamond-pushup', name: 'Diamond push-ups', muscleGroup: 'chest', equipment: [], reps: '8-12', cue: 'Hands together under chest to add triceps emphasis.' },

  // ---- Back ----
  { id: 'pullup', name: 'Pull-ups', muscleGroup: 'back', equipment: ['pull-up-bar'], reps: '5-10', cue: 'Pull chest toward the bar, control the lowering phase.' },
  { id: 'chinup', name: 'Chin-ups', muscleGroup: 'back', equipment: ['pull-up-bar'], reps: '5-10', cue: 'Underhand grip, focus on squeezing the lats.' },
  { id: 'inverted-row', name: 'Inverted rows', muscleGroup: 'back', equipment: ['pull-up-bar'], reps: '8-12', cue: 'Body straight, pull chest to the bar.' },
  { id: 'db-row', name: 'Dumbbell bent-over row', muscleGroup: 'back', equipment: ['dumbbells'], reps: '10-12', cue: 'Flat back, pull dumbbell toward your hip.' },
  { id: 'db-single-arm-row', name: 'Single-arm dumbbell row', muscleGroup: 'back', equipment: ['dumbbells', 'bench'], reps: '10-12 / side', cue: 'Support one knee on the bench, row with a flat back.' },
  { id: 'barbell-row', name: 'Barbell bent-over row', muscleGroup: 'back', equipment: ['barbell'], reps: '8-10', cue: 'Hinge at the hips, pull the bar to your lower ribs.' },
  { id: 'band-row', name: 'Resistance band row', muscleGroup: 'back', equipment: ['resistance-bands'], reps: '12-15', cue: 'Anchor band in front, pull elbows straight back.' },
  { id: 'cable-lat-pulldown', name: 'Cable lat pulldown', muscleGroup: 'back', equipment: ['cable-machine'], reps: '10-12', cue: 'Pull the bar to your upper chest, elbows down.' },
  { id: 'kb-swing', name: 'Kettlebell swing', muscleGroup: 'back', equipment: ['kettlebell'], reps: '12-15', cue: 'Hinge from the hips, drive with your glutes, not your arms.' },
  { id: 'superman', name: 'Superman hold', muscleGroup: 'back', equipment: [], reps: '30-45 sec', cue: 'Lift chest and legs off the floor, squeeze lower back.' },

  // ---- Shoulders ----
  { id: 'pike-pushup', name: 'Pike push-ups', muscleGroup: 'shoulders', equipment: [], reps: '8-12', cue: 'Hips high, lower head toward the floor between your hands.' },
  { id: 'db-shoulder-press', name: 'Dumbbell shoulder press', muscleGroup: 'shoulders', equipment: ['dumbbells'], reps: '8-12', cue: 'Press overhead without arching your lower back.' },
  { id: 'barbell-ohp', name: 'Barbell overhead press', muscleGroup: 'shoulders', equipment: ['barbell'], reps: '6-10', cue: 'Brace your core, press the bar straight overhead.' },
  { id: 'db-lateral-raise', name: 'Dumbbell lateral raise', muscleGroup: 'shoulders', equipment: ['dumbbells'], reps: '12-15', cue: 'Raise to shoulder height with a slight elbow bend.' },
  { id: 'band-lateral-raise', name: 'Band lateral raise', muscleGroup: 'shoulders', equipment: ['resistance-bands'], reps: '12-15', cue: 'Stand on the band, raise arms out to the sides.' },
  { id: 'kb-press', name: 'Kettlebell overhead press', muscleGroup: 'shoulders', equipment: ['kettlebell'], reps: '8-10 / side', cue: 'Press from the rack position, keep wrist stacked over elbow.' },
  { id: 'cable-face-pull', name: 'Cable face pull', muscleGroup: 'shoulders', equipment: ['cable-machine'], reps: '12-15', cue: 'Pull rope toward your face, elbows high.' },
  { id: 'plank-shoulder-tap', name: 'Plank shoulder taps', muscleGroup: 'shoulders', equipment: [], reps: '16-20 taps', cue: 'Keep hips still while tapping the opposite shoulder.' },

  // ---- Legs ----
  { id: 'bodyweight-squat', name: 'Bodyweight squats', muscleGroup: 'legs', equipment: [], reps: '15-20', cue: 'Sit hips back and down, chest up, knees tracking toes.' },
  { id: 'lunge', name: 'Walking lunges', muscleGroup: 'legs', equipment: [], reps: '10-12 / side', cue: 'Step forward, lower back knee toward the floor.' },
  { id: 'glute-bridge', name: 'Glute bridges', muscleGroup: 'legs', equipment: [], reps: '15-20', cue: 'Squeeze glutes at the top, keep ribs down.' },
  { id: 'jump-squat', name: 'Jump squats', muscleGroup: 'legs', equipment: [], reps: '10-15', cue: 'Land softly, immediately sink into the next rep.' },
  { id: 'db-goblet-squat', name: 'Dumbbell goblet squat', muscleGroup: 'legs', equipment: ['dumbbells'], reps: '10-15', cue: 'Hold dumbbell at chest, squat between your knees.' },
  { id: 'db-lunge', name: 'Dumbbell lunges', muscleGroup: 'legs', equipment: ['dumbbells'], reps: '10-12 / side', cue: 'Dumbbells at your sides, step through with control.' },
  { id: 'barbell-back-squat', name: 'Barbell back squat', muscleGroup: 'legs', equipment: ['barbell'], reps: '6-10', cue: 'Bar on upper back, brace core, squat to depth.' },
  { id: 'barbell-deadlift', name: 'Barbell deadlift', muscleGroup: 'legs', equipment: ['barbell'], reps: '5-8', cue: 'Flat back, push the floor away as you stand up.' },
  { id: 'kb-goblet-squat', name: 'Kettlebell goblet squat', muscleGroup: 'legs', equipment: ['kettlebell'], reps: '10-15', cue: 'Hold kettlebell by the horns close to your chest.' },
  { id: 'bulgarian-split-squat', name: 'Bulgarian split squats', muscleGroup: 'legs', equipment: ['bench'], reps: '8-10 / side', cue: 'Rear foot elevated on the bench, lower straight down.' },
  { id: 'band-squat', name: 'Resistance band squat', muscleGroup: 'legs', equipment: ['resistance-bands'], reps: '15-20', cue: 'Band under feet and over shoulders, squat against tension.' },
  { id: 'jump-rope', name: 'Jump rope', muscleGroup: 'legs', equipment: ['jump-rope'], reps: '60-90 sec', cue: 'Small hops, spin the rope from your wrists.' },

  // ---- Arms ----
  { id: 'tricep-dip', name: 'Bench tricep dips', muscleGroup: 'arms', equipment: ['bench'], reps: '10-15', cue: 'Lower until elbows hit ~90 degrees, push back up.' },
  { id: 'db-curl', name: 'Dumbbell bicep curl', muscleGroup: 'arms', equipment: ['dumbbells'], reps: '10-12', cue: 'Keep elbows pinned to your sides.' },
  { id: 'db-overhead-tricep', name: 'Dumbbell overhead tricep extension', muscleGroup: 'arms', equipment: ['dumbbells'], reps: '10-12', cue: 'Lower dumbbell behind your head, elbows pointed forward.' },
  { id: 'barbell-curl', name: 'Barbell bicep curl', muscleGroup: 'arms', equipment: ['barbell'], reps: '8-12', cue: 'Curl without swinging your torso.' },
  { id: 'band-curl', name: 'Resistance band curl', muscleGroup: 'arms', equipment: ['resistance-bands'], reps: '15-20', cue: 'Stand on the band, curl with control.' },
  { id: 'band-tricep-pushdown', name: 'Band tricep pushdown', muscleGroup: 'arms', equipment: ['resistance-bands'], reps: '15-20', cue: 'Anchor band overhead, extend elbows fully.' },
  { id: 'cable-curl', name: 'Cable bicep curl', muscleGroup: 'arms', equipment: ['cable-machine'], reps: '10-15', cue: 'Keep elbows fixed, curl the bar or handle up.' },
  { id: 'chair-dip', name: 'Chair/floor dips', muscleGroup: 'arms', equipment: [], reps: '10-15', cue: 'Bodyweight alternative to bench dips.' },
  { id: 'close-grip-pushup', name: 'Close-grip push-ups', muscleGroup: 'arms', equipment: [], reps: '8-12', cue: 'Hands just inside shoulder width to target triceps.' },

  // ---- Core ----
  { id: 'plank', name: 'Plank', muscleGroup: 'core', equipment: [], reps: '30-60 sec', cue: 'Straight line from shoulders to ankles, brace your core.' },
  { id: 'crunches', name: 'Crunches', muscleGroup: 'core', equipment: [], reps: '15-20', cue: 'Curl shoulder blades off the floor, exhale at the top.' },
  { id: 'bicycle-crunch', name: 'Bicycle crunches', muscleGroup: 'core', equipment: [], reps: '20-30', cue: 'Rotate elbow to opposite knee with control.' },
  { id: 'leg-raise', name: 'Lying leg raises', muscleGroup: 'core', equipment: [], reps: '12-15', cue: 'Keep lower back pressed into the floor.' },
  { id: 'mountain-climber', name: 'Mountain climbers', muscleGroup: 'core', equipment: [], reps: '20-30', cue: 'Drive knees to chest quickly, keep hips low.' },
  { id: 'russian-twist', name: 'Russian twists', muscleGroup: 'core', equipment: [], reps: '20-30', cue: 'Rotate torso side to side, feet may stay grounded.' },
  { id: 'db-russian-twist', name: 'Weighted Russian twist', muscleGroup: 'core', equipment: ['dumbbells'], reps: '20-30', cue: 'Hold a dumbbell with both hands while twisting.' },
  { id: 'kb-russian-twist', name: 'Kettlebell Russian twist', muscleGroup: 'core', equipment: ['kettlebell'], reps: '20-30', cue: 'Hold kettlebell close to your chest while rotating.' },
  { id: 'ab-rollout', name: 'Barbell ab rollout', muscleGroup: 'core', equipment: ['barbell'], reps: '8-12', cue: 'Roll out slowly, keep hips from sagging.' },
  { id: 'hanging-leg-raise', name: 'Hanging leg raises', muscleGroup: 'core', equipment: ['pull-up-bar'], reps: '8-12', cue: 'Hang from the bar, raise legs without swinging.' },
  { id: 'band-pallof-press', name: 'Band Pallof press', muscleGroup: 'core', equipment: ['resistance-bands'], reps: '10-12 / side', cue: 'Resist rotation while pressing the band straight out.' },
  { id: 'side-plank', name: 'Side plank', muscleGroup: 'core', equipment: [], reps: '20-30 sec / side', cue: 'Stack feet, lift hips into a straight line.' },
]

export const WARMUP_EXERCISES = [
  'Arm circles',
  'Bodyweight squats',
  'Jumping jacks',
  'Leg swings',
  'Torso twists',
  'High knees',
  'Hip circles',
  'Walking lunges (no weight)',
]

export const COOLDOWN_EXERCISES = [
  'Standing quad stretch',
  'Standing hamstring stretch',
  "Child's pose",
  'Chest doorway stretch',
  "Cat-cow stretch",
  'Overhead triceps stretch',
  "Cobra stretch",
  'Deep breathing / box breathing',
]
