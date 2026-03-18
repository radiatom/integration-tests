import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import useGetCalories from '@/hooks/useGetCalories'
import { WorkoutData } from '@/types/interfaces'

// interface
interface IKcalDynamicProps {
  workout: WorkoutData
  isRunning: boolean
  setTimeActivity: Dispatch<SetStateAction<number>>
  timeActivity: number
}

// component
const KcalDynamic: FC<Readonly<IKcalDynamicProps>> = ({
  workout,
  isRunning,
  setTimeActivity,
  timeActivity,
}) => {
  const ref = useRef<NodeJS.Timeout | null>(null)
  const kcal = useGetCalories(workout, timeActivity, true)
  const [setTime, setSetTime] = useState<Date>()

  useEffect(() => {
    if (!isRunning) return setSetTime(undefined)

    ref.current = setInterval(() => {
      const now = new Date()

      if (setTime?.getTime() && now.getTime() - setTime.getTime() >= 2000) {
        const dif = Math.floor((now.getTime() - setTime.getTime()) / 1000)
        setTimeActivity(timeActivity + dif)
      } else {
        setTimeActivity((s) => s + 1)
      }
      setSetTime(now)
    }, 1000)

    return () => {
      if (ref.current) clearInterval(ref.current)
    }
  }, [isRunning])
  // return
  return <>{kcal}</>
}

export default KcalDynamic
