import React, { FC } from 'react'
import percentSvg from '@/assets/images/challenges/percent.svg'
import arrowSvg from '@/assets/images/challenges/green-next-arrow.svg'
import { formatDayCount } from '@/helpers/formatDayCount'
import { useTranslation } from 'react-i18next'
import { formatDaysLeftTranslations } from '@/helpers/formatDaysLeftTranslations'
import { ROUTES } from '@/constants/routes'
import { Challenge } from '@/types/interfaces'
import ImageComponent from '@/components/ImageComponent/ImageComponent'
import { Link } from 'react-router-dom'

// interface
interface IChallengeCardProps {
  challenge: Challenge
}

// component
const ChallengeCard: FC<Readonly<IChallengeCardProps>> = ({ challenge }) => {
  const { i18n } = useTranslation()
  const currentLocale = i18n.language

  // return
  return (
    <Link
      className={
        'grid gap-5 grid-cols-[auto_1fr_auto] items-center p-3 pr-5 rounded-r16 bg-white shadow-[0px_1px_2px_0px_#0000000A,0px_2px_4px_0px_#00000005] transition active:scale-95'
      }
      to={`${ROUTES.CHALLENGES}/${challenge._id}`}
    >
      <div
        className={'relative w-[84px] h-[84px] p-[2px] rounded-r10 rotate-180 bg-[#B7BABE]'}
        style={{
          backgroundImage: `conic-gradient(#13D16A, #13D16A ${challenge.completionPercentage}%, transparent ${challenge.completionPercentage}%)`,
        }}
      >
        <ImageComponent
          src={challenge.challengeId.image}
          alt={challenge.challengeId.title}
          className={
            'w-full h-full object-cover border-2 border-white rounded-r8 relative rotate-180'
          }
        />

        <div
          className={
            ' w-[15px] h-[15px] rounded-full bg-white absolute top-[-2px] left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180 shadow-[0px_2.61px_5.22px_0px_#66D74D29,0px_5.22px_13.04px_0px_#7AEC6E42]'
          }
        />

        <div className={'absolute top-[-6px] left-1/2 -translate-x-1/2 rotate-180'}>
          <img src={percentSvg} alt={'percent'} />

          <span
            className={
              'absolute top-0 left-1/2 -translate-x-1/2 font-semibold text-md leading-[150%] text-white'
            }
          >
            {challenge.completionPercentage}%
          </span>
        </div>
      </div>

      <div className={'grid grid-rows-[auto_1fr_auto] h-full'}>
        <p className={'text-secondary text-xs2 font-[450]'}>
          {formatDaysLeftTranslations(challenge.daysRemaining, currentLocale)}
        </p>

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

      <img src={arrowSvg} alt={'arrow'} />
    </Link>
  )
}

export default ChallengeCard
