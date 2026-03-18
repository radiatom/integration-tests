import { Stage } from '@/components/pages/FastingPage/types'

export const getTimeSecond = (index: number, stages: Stage[]) => {
  return stages
    .map((el) => el.durationHours * 60 * 60)
    .slice(index)
    .reduce((acc, curr) => acc + curr, 0)
}

export const getCurrentStage = (stages: Stage[], secondsLeft: number) => {
  const durations = stages.map((el) => el.durationHours * 60 * 60)

  let accumulatedTime = 0

  for (let i = 0; i < durations.length; i++) {
    accumulatedTime += durations[i]

    if (secondsLeft < accumulatedTime) {
      return stages[i]
    }
  }

  return stages[stages.length - 1]
}
