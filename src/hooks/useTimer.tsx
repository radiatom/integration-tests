import { useEffect, useState } from 'react'

type UseTimerOptions = {
  delay: number
  stopKey?: string
  storage?: 'sessionStorage' | 'localStorage'
}

export const useTimer = ({ delay, stopKey, storage = 'sessionStorage' }: UseTimerOptions) => {
  const storageObj = storage === 'localStorage' ? window.localStorage : window.sessionStorage

  const [isLoading, setIsLoading] = useState(() =>
    stopKey ? storageObj.getItem(stopKey) !== 'true' : true,
  )

  useEffect(() => {
    if (!isLoading) return

    const timer = setTimeout(() => {
      setIsLoading(false)
      stopKey && storageObj.setItem(stopKey, 'true')
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, isLoading, stopKey, storageObj])

  return { isLoading }
}
