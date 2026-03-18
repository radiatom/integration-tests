import { ChallengeDay } from '@/types/interfaces'

export const chunkArray = (arr: ChallengeDay[]) => {
  const sortedDays = [...arr].sort((a, b) => a.dayNumber - b.dayNumber)

  const result: ChallengeDay[][] = []
  const chunkSize = 5

  for (let i = 0; i < sortedDays.length; i += chunkSize) {
    result.push(sortedDays.slice(i, i + chunkSize))
  }

  return result
}
