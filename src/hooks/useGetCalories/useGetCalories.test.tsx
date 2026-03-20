import { renderHook } from '@testing-library/react'
import useGetCalories from '@/hooks/useGetCalories/useGetCalories'
import { ExerciseData, WorkoutData } from '@/types/interfaces'

describe('useGetCalories hook', () => {
  test('it is not have arguments', () => {
    expect(renderHook(useGetCalories).result.current).toBe('0')
  })

  test('return calories', () => {
    const workouts: WorkoutData = {
      calories: '200',
      exercises: [{ duration: '100' } as ExerciseData, { duration: '100' } as ExerciseData],
    } as WorkoutData

    expect(renderHook(() => useGetCalories(workouts, 100, false)).result.current).toBe('87')
    expect(renderHook(() => useGetCalories(workouts, 100, true)).result.current).toBe('87.0')
  })

  test('return 0 calories while start', () => {
    const workouts: WorkoutData = {
      calories: '200',
      exercises: [{ duration: '100' } as ExerciseData, { duration: '100' } as ExerciseData],
    } as WorkoutData

    expect(renderHook(() => useGetCalories(workouts, 0, false)).result.current).toBe('0')
    expect(renderHook(() => useGetCalories(workouts, undefined, false)).result.current).toBe('0')
  })
})
