import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import { formatSeconds } from '@/helpers/formatSeconds'
import { WorkoutData } from '@/types/interfaces'
import KcalDynamic from '@/components/KcalDynamic/KcalDynamic'
import FireAnim from '@/components/pages/WorkoutPage/components/WalkingTimer/components/CircularProgress/components/FireAnim'
import {
  getCurrentExerciseIndex,
  getCurrentExerciseTimeLeft,
  getRemainingTime,
} from '@/components/pages/WorkoutPage/components/WalkingTimer/service'

interface Props {
  workout: WorkoutData
  isPlay: boolean
  setSecondsLeft: Dispatch<SetStateAction<number>>
  secondsLeft: number
  onChangeExercises: (index: number, exerciseLeft: number) => void
  activeExercise: number
  setTimeActivity: Dispatch<SetStateAction<number>>
  timeActivity: number
}

const CircularProgress: FC<Props> = ({
  workout,
  isPlay,
  setSecondsLeft,
  secondsLeft,
  onChangeExercises,
  activeExercise,
  setTimeActivity,
  timeActivity,
}) => {
  const ref = useRef<NodeJS.Timeout | null>(null)
  const [size, setSize] = useState(400)

  const strokeWidth = 18
  const center = size / 2
  const radius = (size - strokeWidth * 4) / 2
  const circumference = 2 * Math.PI * radius

  const [setTime, setSetTime] = useState<Date>()

  const progress =
    (getRemainingTime(0, workout) - secondsLeft) / (getRemainingTime(0, workout) / 100)
  const offset = circumference - (progress / 100) * circumference

  useEffect(() => {
    if (!isPlay) return setSetTime(undefined)

    ref.current = setInterval(() => {
      const now = new Date()

      if (setTime?.getTime() && now.getTime() - setTime.getTime() >= 2000) {
        const dif = Math.floor((now.getTime() - setTime.getTime()) / 1000)
        setSecondsLeft(secondsLeft - dif <= 0 ? 0 : secondsLeft - dif)
      } else {
        setSecondsLeft((s) => (s - 1 <= 0 ? 0 : s - 1))
      }
      if (getCurrentExerciseIndex(workout, secondsLeft) !== activeExercise) {
        onChangeExercises(
          getCurrentExerciseIndex(workout, secondsLeft),
          getCurrentExerciseTimeLeft(workout, secondsLeft),
        )
      }
      setSetTime(now)
    }, 1000)

    return () => {
      if (ref.current) clearInterval(ref.current)
    }
  }, [isPlay, setTime, secondsLeft])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 390) {
        setSize(358)
      } else {
        setSize(400)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const renderIcons = () => {
    let accumulatedTime = 0

    return workout.exercises.map((exercise, i) => {
      const percentOfTotal = accumulatedTime / (getRemainingTime(0, workout) || 1)

      const angle = 90 + percentOfTotal * 360

      const x = center + radius * Math.cos((angle * Math.PI) / 180)
      const y = center + radius * Math.sin((angle * Math.PI) / 180)

      accumulatedTime += Number(exercise.duration)

      const isActive = getCurrentExerciseIndex(workout, secondsLeft) >= i

      return (
        <g key={i} transform={`translate(${x - 38}, ${y - 29})`}>
          <svg
            width="75"
            height="75"
            viewBox="0 0 86 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter={isActive ? 'url(#filter0_dd_1_26052)' : ''}>
              <path
                d="M27 33C27 24.1634 34.1634 17 43 17C51.8366 17 59 24.1634 59 33C59 41.8366 51.8366 49 43 49C34.1634 49 27 41.8366 27 33Z"
                fill={isActive ? 'white' : '#D1D5DB'}
              />
              <path
                d="M43 16C52.3888 16 60 23.6112 60 33C60 42.3888 52.3888 50 43 50C33.6112 50 26 42.3888 26 33C26 23.6112 33.6112 16 43 16Z"
                stroke={isActive ? '#13D16A' : '#D1D5DB'}
                strokeWidth="2"
              />
              <path
                d="M43.3769 41H40.8122L42.1456 35.6667H39.3902C39.1239 35.6666 38.8614 35.6042 38.6235 35.4845C38.3856 35.3648 38.1791 35.1911 38.0203 34.9773C37.8615 34.7636 37.7549 34.5156 37.7091 34.2533C37.6632 33.991 37.6794 33.7216 37.7562 33.4667L40.3169 25H46.6282L44.6282 30.3333H47.3102C47.6154 30.3335 47.9148 30.4164 48.1766 30.5731C48.4384 30.7299 48.6528 30.9546 48.7971 31.2235C48.9414 31.4924 49.0101 31.7954 48.996 32.1002C48.9819 32.405 48.8854 32.7003 48.7169 32.9547L43.3769 41ZM42.5202 39.6667H42.6616L47.6056 32.2173C47.641 32.1639 47.6613 32.1019 47.6642 32.0379C47.6672 31.9738 47.6528 31.9102 47.6225 31.8537C47.5922 31.7972 47.5472 31.75 47.4922 31.7171C47.4372 31.6841 47.3743 31.6667 47.3102 31.6667H42.7042L44.7042 26.3333H41.3062L39.0322 33.8507C39.0152 33.9066 39.0116 33.9657 39.0216 34.0232C39.0316 34.0808 39.0549 34.1352 39.0897 34.1821C39.1245 34.2291 39.1698 34.2672 39.222 34.2934C39.2742 34.3197 39.3318 34.3334 39.3902 34.3333H43.8569L42.5202 39.6667Z"
                fill={isActive ? '#13D16A' : 'white'}
              />
              <path
                d="M42.5202 39.6667H42.6616L47.6056 32.2173C47.641 32.1639 47.6613 32.1019 47.6642 32.0379C47.6672 31.9738 47.6528 31.9102 47.6225 31.8537C47.5922 31.7972 47.5472 31.75 47.4922 31.7171C47.4372 31.6841 47.3743 31.6667 47.3102 31.6667H42.7042L44.7042 26.3333H41.3062L39.0322 33.8507C39.0152 33.9066 39.0116 33.9657 39.0216 34.0232C39.0316 34.0808 39.0549 34.1352 39.0897 34.1821C39.1245 34.2291 39.1698 34.2672 39.222 34.2934C39.2742 34.3197 39.3318 34.3334 39.3902 34.3333H43.8569L42.5202 39.6667Z"
                fill={isActive ? '#13D16A' : 'white'}
              />
            </g>
            <defs>
              <filter
                id="filter0_dd_1_26052"
                x="0"
                y="0"
                width="86"
                height="86"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="5" />
                <feGaussianBlur stdDeviation="5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.478431 0 0 0 0 0.92549 0 0 0 0 0.431373 0 0 0 0.16 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1_26052"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="10" />
                <feGaussianBlur stdDeviation="12.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.478431 0 0 0 0 0.92549 0 0 0 0 0.431373 0 0 0 0.26 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect1_dropShadow_1_26052"
                  result="effect2_dropShadow_1_26052"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect2_dropShadow_1_26052"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </g>
      )
    })
  }

  return (
    <div
      className="relative flex items-center justify-center mx-[-25px] mt-[-17px] mb-[-30px]"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="rotate-90 transform">
        <defs>
          <filter id="progress-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="5" dy="0" stdDeviation="5" floodColor="#7AEC6E" floodOpacity="0.16" />
            <feDropShadow
              dx="10"
              dy="0"
              stdDeviation="12.5"
              floodColor="#7AEC6E"
              floodOpacity="0.26"
            />
          </filter>

          <linearGradient id="circle-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00E668" />
            <stop offset="100%" stopColor="#13D16A" />
          </linearGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#circle-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          filter="url(#progress-shadow)"
          className="transition-all duration-500 ease-out"
        />
        <g className="-rotate-90 origin-center">{renderIcons()}</g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center font-sans">
        <span className="text-xl7 font-medium text-[#1F2937]">{formatSeconds(secondsLeft)}</span>

        <div className="mt-2 flex flex-col items-center">
          <FireAnim />

          <span className="text-xs text-gray9 font-medium">Kcal</span>

          <span className="text-xl4 font-semibold text-dark">
            {
              <KcalDynamic
                workout={workout}
                isRunning={isPlay}
                setTimeActivity={setTimeActivity}
                timeActivity={timeActivity}
              />
            }
          </span>
        </div>
      </div>
    </div>
  )
}

export default CircularProgress
