import React, { FC, useEffect, useRef, useState } from 'react'
import { formatSeconds } from '@/helpers/formatSeconds'

// interface
interface IProps {
  isRunning: boolean
}

const Timer: FC<Readonly<IProps>> = ({ isRunning }) => {
  const [seconds, setSeconds] = useState(0)
  const ref = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isRunning) return

    ref.current = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)

    return () => {
      if (ref.current) clearInterval(ref.current)
    }
  }, [isRunning])

  return <>{formatSeconds(seconds)}</>
}
export default Timer
