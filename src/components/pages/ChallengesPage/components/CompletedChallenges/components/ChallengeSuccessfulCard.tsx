import React, { FC } from 'react'
import { formatDayCount } from '@/helpers/formatDayCount'
import { useTranslation } from 'react-i18next'
import { UserChallenge } from '@/types/interfaces'
import trophieSvg from '@/assets/images/challenges/trophy-gold.svg'
import { formatTextCount } from '@/components/pages/TrophiesPage/components/TrophieCard/helpers/formatTime'
import ImageComponent from '@/components/ImageComponent/ImageComponent'

// interface
interface IChallengeSuccessfulCardProps {
  challenge: UserChallenge
}

// component
const ChallengeSuccessfulCard: FC<Readonly<IChallengeSuccessfulCardProps>> = ({ challenge }) => {
  const { i18n } = useTranslation()
  const currentLocale = i18n.language

  // return
  return (
    <div
      className={
        'relative grid w-full h-[104px] justify-end items-center pr-5  rounded-r16  bg-white border border-[#FFC422] shadow-[0px_1px_2px_0px_#0000000A,0px_2px_4px_0px_#00000005] transition active:scale-95 z-[-1]'
      }
    >
      <div
        className={
          'absolute -top-px -left-px  w-[calc(100%_+2px)] h-[calc(100%_+2px)] rounded-r16 overflow-hidden z-[5]'
        }
      >
        <div className="absolute -top-1/2 left-3/4 w-[150px] h-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/90 to-transparent animate-shine" />
      </div>

      <div
        className={
          'absolute top-0 left-0  w-full h-full grid gap-5 grid-cols-[auto_1fr_auto] p-3 pr-5 items-center z-10'
        }
      >
        <ImageComponent
          src={challenge.challengeId.image}
          alt={challenge.challengeId.title}
          className={'w-[80px] h-full object-cover rounded-r8 relative'}
        />

        <div className={'grid grid-rows-[1fr_auto] h-full gap-[5px]'}>
          <p className={'font-medium line-clamp-2'}>{challenge.challengeId.title}</p>

          <div className={'grid gap-1 grid-cols-[auto_auto] w-fit'}>
            <div
              className={
                'py-[2px] px-[6px] bg-[#00000008] text-[450] text-[#B7BABE] text-xs rounded-full '
              }
            >
              {challenge.challengeId.categoryId.name}
            </div>

            <div
              className={
                'py-[2px] px-[6px] bg-[#00000008] text-[450] text-[#B7BABE] text-xs rounded-full '
              }
            >
              {challenge.challengeId.challengePeriod}{' '}
              {formatDayCount(challenge.challengeId.challengePeriod, currentLocale)}
            </div>
          </div>
        </div>

        <div className={'relative w-[62px] mx-auto h-[72.5px] overflow-visible cursor-pointer'}>
          <div className={'grid justify-items-center absolute top-2 left-1/2 -translate-x-1/2'}>
            <p className={'font-semibold text-xl3 leading-none'}>
              {challenge.completionCount}
              {challenge.completionCount > 1 && 'x'}
            </p>

            <p className={'text-xs2_1'}>
              {formatTextCount(challenge.completionCount, currentLocale)}
            </p>
          </div>
        </div>
      </div>

      <div className={'relative w-[62px] mx-auto h-[72.5px] overflow-visible cursor-pointer'}>
        <img
          src={trophieSvg}
          className={'absolute  w-[76px] h-[107px] max-w-none left-1/2 -translate-x-1/2'}
          alt={''}
        />
      </div>
    </div>
  )
}

export default ChallengeSuccessfulCard
