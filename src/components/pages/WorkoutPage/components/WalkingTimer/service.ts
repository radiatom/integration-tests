import { WorkoutData } from '@/types/interfaces'

export const getRemainingTime = (index: number, workout: WorkoutData) => {
  return workout.exercises
    .map((el) => Number(el.duration))
    .slice(index)
    .reduce((acc, curr) => acc + curr, 0)
}

export const getCurrentExerciseIndex = (workout: WorkoutData, secondsLeft: number) => {
  const durations = workout.exercises.map((el) => Number(el.duration))

  const totalDuration = durations.reduce((a, b) => a + b, 0)
  const elapsedTime = totalDuration - secondsLeft

  let accumulatedTime = 0

  for (let i = 0; i < durations.length; i++) {
    accumulatedTime += durations[i]

    if (elapsedTime < accumulatedTime) {
      return i
    }
  }

  return durations.length - 1
}

export const getCurrentExerciseTimeLeft = (workout: WorkoutData, secondsLeft: number) => {
  const durations = workout.exercises.map((el) => Number(el.duration))

  const totalDuration = durations.reduce((a, b) => a + b, 0)
  const elapsedTime = totalDuration - secondsLeft

  let accumulatedTime = 0

  for (let i = 0; i < durations.length; i++) {
    accumulatedTime += durations[i]

    if (elapsedTime < accumulatedTime) {
      return accumulatedTime - elapsedTime
    }
  }

  return 0
}
