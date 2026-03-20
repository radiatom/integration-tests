import React, { FC } from 'react'
import { WorkoutData } from '@/types/interfaces'
import useGetCalories from '@/hooks/useGetCalories/useGetCalories'

// interface
interface IKcalPlayerProps {
  workout: WorkoutData
  dateStart: string
}

// component
const KcalPlayer: FC<Readonly<IKcalPlayerProps>> = ({ workout, dateStart }) => {
  const now = new Date()
  const start = new Date(dateStart)
  const totalTimePassed = Math.floor((now.getTime() - start.getTime()) / 1000)
  const kcal = useGetCalories(workout, totalTimePassed)
  // return
  return <>{kcal}</>
}

export default KcalPlayer
