import { useMemo } from 'react'
import { WorkoutData } from '@/types/interfaces'

const useGetCalories = (
  workout: WorkoutData,
  totalTimePassed?: number,
  toFixed?: boolean,
): string => {
  const totalDuration = useMemo(() => {
    if (!workout?.exercises) return 0

    return workout.exercises
      .map((el) => Number(el.duration))
      .reduce((acc: number, num: number) => {
        return acc + num + 15
      }, 0)
  }, [workout?.exercises])

  if (!totalTimePassed || !workout?.calories || totalDuration === 0) return '0'

  const calculated = (Number(workout.calories) / totalDuration) * totalTimePassed

  return toFixed ? calculated.toFixed(1) : Math.round(calculated) + ''
}

export default useGetCalories
