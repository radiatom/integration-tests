import React, { FC, useEffect, useState } from 'react'
import { formatSeconds } from '@/helpers/formatSeconds'

// interface
interface ICountdownTimerProps {
  classNameWrapper?: string
  initialSeconds: number
  isStop?: boolean
  onEnd?: () => void
}

// component
const CountdownTimer: FC<Readonly<ICountdownTimerProps>> = ({
  classNameWrapper,
  initialSeconds,
  isStop,
  onEnd,
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds)
  const [setTime, setSetTime] = useState<Date>()

  useEffect(() => {
    if (remainingSeconds <= 0 || isStop) {
      return setSetTime(undefined)
    }

    const interval = setInterval(() => {
      const now = new Date()

      if (setTime?.getTime() && now.getTime() - setTime.getTime() >= 2000) {
        const dif = Math.floor((now.getTime() - setTime.getTime()) / 1000)
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            if (onEnd) {
              onEnd()
            }
            return 0
          }
          return prev - dif > 0 ? prev - dif : prev - prev
        })
      } else {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            if (onEnd) {
              onEnd()
            }
            return 0
          }
          return prev - 1
        })
      }

      setSetTime(now)
    }, 1000)

    return () => clearInterval(interval)
  }, [initialSeconds, isStop, remainingSeconds])

  useEffect(() => {
    setRemainingSeconds(initialSeconds)
  }, [initialSeconds])

  // return
  return <div className={classNameWrapper}>{formatSeconds(remainingSeconds)}</div>
}

export default CountdownTimer
