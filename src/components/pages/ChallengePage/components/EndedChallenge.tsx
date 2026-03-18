import React, { FC } from 'react'
import happyFaceSvg from '@/assets/images/challenges/happy-face.svg'
import { useTranslation } from 'react-i18next'

// interface
interface IEndedChallengeProps {}

// component
const EndedChallenge: FC<Readonly<IEndedChallengeProps>> = () => {
  const { t } = useTranslation()

  // return
  return (
    <div className={'grid gap-4 w-full justify-items-center'}>
      <img src={happyFaceSvg} alt={'End Workout'} className={'h-[48px]'} />

      <h4 className={'font-semibold text-xl4 text-center text-dark'}>
        {t('gettingStartedIsHardest')}
      </h4>

      <p className={'text-base2 text-secondary text-center px-2'}>{t('challengeEndedMessage')}</p>
    </div>
  )
}

export default EndedChallenge
