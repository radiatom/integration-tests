import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { formatSeconds } from '@/helpers/formatSeconds'
import { useGlobalStore } from '@/stores'
import { differenceInSeconds, format, parseISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { FastingModel, Stage } from '@/components/pages/FastingPage/types'
import { getCurrentStage, getTimeSecond } from '@/components/pages/FastingPage/helpers'
import BodyStatus from '@/components/pages/FastingPage/components/BodyStatus'

interface Props {
  setActiveStage: Dispatch<SetStateAction<Stage>>
  stages: Stage[]
  activeModel: FastingModel
  defaultStage: Stage
  dateStartFastingInCard: Date
}

const CircularFastingProgress: FC<Props> = ({
  setActiveStage,
  stages,
  activeModel,
  defaultStage,
  dateStartFastingInCard,
}) => {
  const now = new Date()
  const { t } = useTranslation()
  const [activeStageSvg, setActiveStageSvg] = useState<Stage | null>(null)
  const dateStartFasting = useGlobalStore((state) => state.dateStartFasting)
  const durationFastingSecond = activeModel.fastingDuration * 60 * 60
  const [secondsPassed, setSecondsPassed] = useState(
    dateStartFasting ? differenceInSeconds(now, parseISO(dateStartFasting)) : 0,
  )

  const size = 358
  const strokeWidth = 21
  const center = size / 2
  const radius = (size - strokeWidth * 4) / 2
  const fullCircumference = 2 * Math.PI * radius
  const visiblePercentage = 0.66
  const totalArcLength = fullCircumference * visiblePercentage
  const progressPercent =
    secondsPassed > durationFastingSecond ? 100 : (secondsPassed / durationFastingSecond) * 100
  const offset = totalArcLength * (1 - progressPercent / 100)

  useEffect(() => {
    if (!dateStartFasting) {
      setSecondsPassed((prev) => (prev !== 0 ? 0 : prev))

      setActiveStage((prev) => {
        if (prev.id !== defaultStage.id) {
          return defaultStage
        }
        return prev
      })
      return
    }

    const interval = setInterval(() => {
      const now = new Date()
      const diff = differenceInSeconds(now, parseISO(dateStartFasting))

      if (diff >= 0) {
        setSecondsPassed(diff)

        setActiveStage((prev) => {
          const nextStage = getCurrentStage(stages, diff)
          return prev.id !== nextStage.id ? nextStage : prev
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [dateStartFasting, stages, defaultStage])

  const renderIcons = () => {
    let accumulatedTime = 0

    return stages.map((stage, i) => {
      const percentOfTotal = accumulatedTime / (getTimeSecond(0, stages) || 1)

      const angle = percentOfTotal * 360 * visiblePercentage

      const x = center + radius * Math.cos((angle * Math.PI) / 180)
      const y = center + radius * Math.sin((angle * Math.PI) / 180)

      const stageDurationSecond = stage.durationHours * 60 * 60

      accumulatedTime += stageDurationSecond
      const isActive =
        secondsPassed !== 0 &&
        stages.findIndex((el) => el.id === getCurrentStage(stages, secondsPassed).id) >= i
      return (
        <g key={i} transform={`translate(${x + 7}, ${y + 24}) rotate(-150)`}>
          <image
            href={isActive ? stage.svgProgress : stage.svgProgressInactive}
            onClick={() => setActiveStageSvg(stage)}
          />
        </g>
      )
    })
  }

  return (
    <>
      <div
        className="relative flex items-center justify-center mx-[-25px] mt-[-17px] mb-[-30px]"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="rotate-[150deg] transform">
          <defs>
            <filter id="progress-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="5"
                dy="0"
                stdDeviation="5"
                floodColor="#7AEC6E"
                floodOpacity="0.16"
              />
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
            stroke="#CCFFD7"
            strokeWidth={strokeWidth}
            strokeDasharray={`${totalArcLength} ${fullCircumference}`}
            strokeLinecap="round"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="url(#circle-gradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${totalArcLength} ${fullCircumference}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            filter="url(#progress-shadow)"
            className="transition-all duration-500 ease-out"
          />
          <g className=" origin-center">{renderIcons()}</g>
        </svg>

        {secondsPassed !== 0 ? (
          <div className="absolute top-[150px] grid h-fit gap-3  items-center justify-items-center">
            <span className="text-xl5 font-bold text-[#1F2937]">
              {formatSeconds(secondsPassed, true)}
            </span>
          </div>
        ) : (
          <div className="absolute top-[135px] grid h-fit gap-3  items-center justify-items-center ">
            <p className={'font-medium text-md text-[#89939B] leading-none'}>
              {t('fastingStartsAt')}
            </p>

            <p className="text-xl3 font-bold text-[#1F2937] leading-none">
              {format(dateStartFastingInCard, 'hh:mm aaa')}
            </p>
          </div>
        )}
      </div>

      {activeStageSvg && (
        <BodyStatus
          isOpen={!!activeStageSvg}
          onClose={() => setActiveStageSvg(null)}
          activeStage={activeStageSvg}
          activeModel={activeModel}
        />
      )}
    </>
  )
}

export default CircularFastingProgress
