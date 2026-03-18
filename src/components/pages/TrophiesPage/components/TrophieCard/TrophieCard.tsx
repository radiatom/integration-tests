import React, { FC } from 'react'
import trophieSvg from '@/assets/images/challenges/trophy-gold.svg'
import { formatTextCount } from '@/components/pages/TrophiesPage/components/TrophieCard/helpers/formatTime'
import { useTranslation } from 'react-i18next'
import { UserChallenge } from '@/types/interfaces'

// interface
interface ITrophieCardProps {
  trophie: UserChallenge
}

// component
const TrophieCard: FC<Readonly<ITrophieCardProps>> = ({ trophie }) => {
  const { i18n, t } = useTranslation()
  const currentLocale = i18n.language
  const count = trophie.completionCount
  const progress = trophie.completionPercentage
  const isProgress = progress !== 100

  // return
  return (
    <div className={'grid h-fit gap-3 justify-items-center'}>
      <div className={'relative w-[75px] h-[72.5px] overflow-visible '}>
        <img src={trophieSvg} alt={''} />

        <div
          className={
            'absolute top-0 left-1/2 -translate-x-1/2 w-[62px] h-full rounded-[33px] overflow-hidden'
          }
        >
          <div className="absolute -top-1/2 left-3/4 w-3/4 h-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shine" />
        </div>

        <div className={'grid justify-items-center absolute top-[10px] left-1/2 -translate-x-1/2'}>
          <p className={'font-semibold text-xl3 leading-none'}>
            {count}
            {count > 1 && 'x'}
          </p>

          <p className={'text-xs2_1'}>{formatTextCount(count, currentLocale)}</p>
        </div>
      </div>

      <div>
        <p className={'text-xs2_1 leading-[150%]'}>{trophie.challengeId.title}</p>

        <p className={'text-secondary text-xs3 leading-[140%]'}>
          {isProgress ? t('inProgress') : t('completed')}
        </p>
      </div>

      {isProgress && (
        <div className={'w-[74px] rounded-full border border-green h-[7px] p-px'}>
          <div className={'bg-green h-full rounded-full'} style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  )
}

export default TrophieCard
