import React, { FC } from 'react'
import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'
import checkSvg from '@/assets/images/challenges/check.svg'
import { Milestone } from '@/types/interfaces'

// interface
interface IMilestoneCardProps {
  milestone: Milestone
  activeDayNumber: number | null
  isCompleted: boolean
  isDiscover?: boolean
  isLastMilestone?: boolean
}

// component
const MilestoneCard: FC<Readonly<IMilestoneCardProps>> = ({
  milestone,
  activeDayNumber,
  isCompleted,
  isDiscover,
  isLastMilestone,
}) => {
  const { t } = useTranslation()
  const currentDayNumber = activeDayNumber || (isCompleted ? 1000 : 0)
  const isActiveMilestone =
    currentDayNumber <= milestone.dayEnd && currentDayNumber >= milestone.dayStart

  const progress =
    currentDayNumber < milestone.dayStart
      ? 0
      : currentDayNumber > milestone.dayEnd
        ? 100
        : (100 / (milestone.dayEnd - milestone.dayStart)) * (currentDayNumber - milestone.dayStart)

  // return
  return (
    <div className={'grid grid-cols-[auto_1fr] gap-3'}>
      <div className={'grid relative top-[3px] grid-rows-[auto_1fr] h-full justify-items-center'}>
        {progress < 100 || isDiscover ? (
          <div
            className={clsx(
              'grid items-center justify-items-center w-[16px] h-[16px] rounded-full ',
              {
                'bg-[#B3B3B34F]': !isActiveMilestone,
                'bg-white shadow-[0px_2.61px_5.22px_0px_#66D74D29,0px_5.22px_13.04px_0px_#7AEC6E42]':
                  isActiveMilestone || isDiscover,
              },
            )}
          >
            <div
              className={clsx('w-[6.5px] h-[6.5px] rounded-full ', {
                'bg-[#B3B3B34F]': !isActiveMilestone,
                'bg-green ': isActiveMilestone || isDiscover,
              })}
            />
          </div>
        ) : (
          <div
            className={
              'grid items-center justify-items-center w-[16px] h-[16px] rounded-full bg-[linear-gradient(180deg,#6DE187_0%,#61CE75_100%)]'
            }
          >
            <img src={checkSvg} alt={'check'} />
          </div>
        )}

        <div className={'relative w-px h-full bg-border1 -translate-x-1/2'}>
          <div
            className={'absolute top-0 left-0 w-px bg-green transition-[height]'}
            style={{
              height: `${progress}%`,
            }}
          />
        </div>
      </div>

      <div
        className={clsx('pb-3', {
          'pb-[91px] ': isLastMilestone,
        })}
      >
        <p
          className={clsx('mb-px font-medium text-base ', {
            'font-semibold text-xl2 text-white': isDiscover,
          })}
        >
          {milestone.dayStart}-{milestone.dayEnd} {t('day')}
        </p>

        <p
          className={clsx('text-secondary', {
            'text-white': isDiscover,
          })}
        >
          {milestone.description}
        </p>
      </div>
    </div>
  )
}

export default MilestoneCard
