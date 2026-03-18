import { useEffect, useRef } from 'react'
import silenceTrack from '@/assets/audio/silence-sound-effect.mp3'

export const useKeepAlive = (isPlay?: boolean, trigger?: any) => {
  const silenceRef = useRef<HTMLAudioElement | null>(null)
  const wakeLockRef = useRef<any>(null)

  useEffect(() => {
    const audio = new Audio(
      silenceTrack,
      // 'https://dnaa3818zsk1p.cloudfront.net/workout/track/6555d9324ae5134125aa6b74?Expires=1769244320&Key-Pair-Id=K28RKBS7PXHUPB&Signature=ORwY9Qqvo5cI4hULCxG6bR8t8ep1cMq3xSgBDsgQkf4p0fxYZFL~6yXS0fi0by1xMGR2mroYHviMBApComOn-~5QrhP-vPhk~l-sZzhVSCfJmTdecR8frhKA9s4hVXLwwhQd7RVcqxzVBfOnBjtslJhZGLxtEyoNMTeF86hwW21gCkCrL68s8zEyNgxN3WoP06j4Un91gaK3Iko1vbPmhvqpbwZPiQIjna-a0muzPYp32No8J6B7zz6M2qwbrwB2lZJS83MmtZUn2cYaBL2Zh9D3m30jbJM26vH4CQ1bIhNgFeJR8IqS8~Zxz-YMpr6t~MvoyOmVeSNALtoJvtgiTA__\n',
    )
    audio.loop = true
    // audio.volume = 0.0001
    audio.volume = 0.2
    silenceRef.current = audio

    return () => {
      audio.pause()
      if (wakeLockRef.current) wakeLockRef.current.release()
    }
  }, [])

  useEffect(() => {
    const startKeepAlive = async () => {
      if (isPlay) {
        silenceRef.current?.play().catch(() => {})

        if ('wakeLock' in navigator && !wakeLockRef.current) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen')
          wakeLockRef.current.preload = 'auto'
        }
      } else {
        silenceRef.current?.pause()
        if (wakeLockRef.current) {
          wakeLockRef.current.release()
          wakeLockRef.current = null
        }
      }
    }

    startKeepAlive()
  }, [isPlay, trigger])
}
