import React, { FC, useEffect, useState } from 'react'
import { formatSeconds } from '@/helpers/formatSeconds'

// interface
interface ITimerProps {
  classNameWrapper?: string
}

// component
const Timer: FC<Readonly<ITimerProps>> = ({ classNameWrapper }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // return
  return <div className={classNameWrapper}>{formatSeconds(elapsedSeconds)}</div>
}

export default Timer
