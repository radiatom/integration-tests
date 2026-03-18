import React, { FC } from 'react'
import fireBlack from '@/assets/images/challenges/fire-black.webp'
import fireOrange from '@/assets/images/challenges/fire-orange.webp'
import firePurple from '@/assets/images/challenges/fire-purple.webp'
import firePink from '@/assets/images/challenges/fire-pink.webp'
import fireBlue from '@/assets/images/challenges/fire-blue.webp'
import { clsx } from 'clsx'

// interface
interface ICurrentStreakProps {
  countStreakPoints: number
}

// component
const CurrentStreak: FC<Readonly<ICurrentStreakProps>> = ({ countStreakPoints }) => {
  const currentFire =
    countStreakPoints > 0 && countStreakPoints <= 29
      ? fireOrange
      : countStreakPoints > 29 && countStreakPoints <= 59
        ? firePurple
        : countStreakPoints > 59 && countStreakPoints <= 89
          ? firePink
          : countStreakPoints > 89
            ? fireBlue
            : fireBlack

  // return
  return (
    <div
      className={clsx(
        'relative grid gap-3 items-center grid-cols-[1fr_auto] rounded-r12 py-2 pl-3 pr-4 bg-white  shadow-[0px_4px_12px_0px_#0000000A,0px_8px_16px_0px_#0000000F]',
        {
          'border-[0.5px] border-[#FF9B43] bg-[linear-gradient(95.53deg,rgba(255,155,67,0)_82.47%,rgba(255,155,67,0.2)_95.18%)]':
            countStreakPoints > 0 && countStreakPoints <= 29,
          'border-[0.5px] border-[#CD74F0] bg-[linear-gradient(95.53deg,rgba(157,124,229,0)_82.47%,rgba(157,124,229,0.2)_95.18%)]':
            countStreakPoints > 29 && countStreakPoints <= 59,
          'border-[0.5px] border-[#FF4081] bg-[linear-gradient(95.53deg,rgba(255,64,129,0)_82.47%,rgba(255,64,129,0.2)_95.18%)]':
            countStreakPoints > 59 && countStreakPoints <= 89,
          'border-[0.5px] border-[#13A2D1] bg-[linear-gradient(95.53deg,rgba(19,209,194,0)_82.47%,rgba(19,162,209,0.2)_95.18%)]':
            countStreakPoints > 89,
        },
      )}
    >
      <div>
        <p className={'font-semibold text-xl '}>Current Streak</p>
        <p className={'text-secondary text-xs'}>Days in a row</p>
      </div>

      <div className={'grid items-center grid-cols-[auto_auto] gap-1'}>
        <p
          className={clsx('text-[#9EA1AD] font-semibold text-xl6', {
            ' text-[#FF9B43]': countStreakPoints > 0 && countStreakPoints <= 29,
            ' text-[#CD74F0]': countStreakPoints > 29 && countStreakPoints <= 59,
            ' text-[#FF4081]': countStreakPoints > 59 && countStreakPoints <= 89,
            ' text-[#13A2D1]': countStreakPoints > 89,
          })}
        >
          {countStreakPoints}
        </p>

        <img src={currentFire} alt="fire" className={'fire-path w-[45px] h-[56px]'} />
      </div>
    </div>
  )
}

export default CurrentStreak
