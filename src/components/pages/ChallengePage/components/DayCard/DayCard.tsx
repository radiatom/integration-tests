import React, { Dispatch, FC, useState } from 'react'
import trophieSvg from '@/assets/images/challenges/trophy-gold.svg'
import actualSvg from '@/assets/images/challenges/day-actual.svg'
import disabledSvg from '@/assets/images/challenges/day-disabled.svg'
import markedSvg from '@/assets/images/challenges/day-marked.svg'
import skippedSvg from '@/assets/images/challenges/day-skipped.svg'
import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'
import { Challenge, ChallengeDay } from '@/types/interfaces'
import useMarkDayMutation from '@/hooks/useMarkDayMutation'
import EndChallenge from '@/components/pages/ChallengePage/components/DayCard/components/EndChallenge'

// interface
interface IDayCardProps {
  idChallenge: string
  activeDayNumber: number | null
  day: ChallengeDay
  isLastDay: boolean
  setChallenge: Dispatch<React.SetStateAction<Challenge | undefined>>
  isDisable?: boolean
}

// component
const DayCard: FC<Readonly<IDayCardProps>> = ({
  idChallenge,
  activeDayNumber,
  day,
  isLastDay,
  setChallenge,
  isDisable,
}) => {
  const { t } = useTranslation()
  const isMarked = day.completed

  const [congratulationsData, setCongratulationsData] = useState<Challenge | null>(null)

  const { mutate, isLoading } = useMarkDayMutation({
    onSuccess: (challenge) => {
      setChallenge(challenge)
      if (isLastDay) {
        setCongratulationsData(challenge)
      }
    },
  })
  const isCurrentDay = day.dayNumber === activeDayNumber

  const svg = activeDayNumber
    ? isCurrentDay
      ? actualSvg
      : day.dayNumber > activeDayNumber
        ? disabledSvg
        : isMarked
          ? markedSvg
          : skippedSvg
    : isMarked
      ? markedSvg
      : isMarked === false
        ? skippedSvg
        : disabledSvg

  const onMarked = async () => {
    if (!isLoading) {
      await mutate({ id: idChallenge, dayNumber: day.dayNumber, isCompleted: !isMarked })
    }
  }

  // return
  return (
    <>
      <div
        className={clsx('relative w-[62px] mx-auto h-[72.5px] overflow-visible cursor-pointer', {
          'active:scale-95 transition ': activeDayNumber === day.dayNumber,
          'pointer-events-none': svg === disabledSvg,
          'opacity-50 pointer-events-none': isDisable,
        })}
        onClick={onMarked}
      >
        <img
          src={isMarked ? (isLastDay ? trophieSvg : markedSvg) : svg}
          className={'absolute  w-[76px] h-[107px] max-w-none left-1/2 -translate-x-1/2'}
          alt={''}
        />

        {isMarked && isLastDay && (
          <div
            className={
              'absolute top-0 left-1/2 -translate-x-1/2 w-[62px] h-full rounded-[33px] overflow-hidden'
            }
          >
            <div className="absolute -top-1/2 left-3/4 w-3/4 h-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shine" />
          </div>
        )}

        <div
          className={clsx(
            'grid justify-items-center absolute top-[10px] left-1/2 -translate-x-1/2',
            {
              'text-[#9EA1AD]': svg === disabledSvg,
            },
          )}
        >
          <p className={'font-semibold text-xl3 leading-none'}>{day.dayNumber}</p>
          <p className={'text-xs2_1'}>{t('day')}</p>
        </div>
      </div>

      {congratulationsData && <EndChallenge challenge={congratulationsData} />}
    </>
  )
}

export default DayCard
