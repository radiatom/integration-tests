import React, { FC, useMemo } from 'react'
import { WorkoutTypeEnum } from '@/types/interfaces'
import { OTP_LINK } from '@/constants/variables'
import { Button } from '@/components/Button/Button'
import ImageComponent from '@/components/ImageComponent/ImageComponent'
import limitedImg from '@/assets/images/limited.webp'
import { IconSVG } from '@/components/IconSvg/IconSvg'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useTranslation } from 'react-i18next'

// interface
interface ILimitedPageProps {}

// component
const LimitedPage: FC<Readonly<ILimitedPageProps>> = () => {
  const userProgram = localStorage.getItem('userProgram')
  const { t } = useTranslation()

  const programType = useMemo(() => {
    const mapping: Record<string, WorkoutTypeEnum> = {
      'Tai Chi': WorkoutTypeEnum.TaiChi,
      'Afrobeat Dance': WorkoutTypeEnum.AfrobeatDance,
      'Asian Chair Yoga': WorkoutTypeEnum.AsianChairYoga,
      'Asian Pilates': WorkoutTypeEnum.AsianPilates,
      'Asian Walking': WorkoutTypeEnum.AsianWalking,
      'Chair Yoga': WorkoutTypeEnum.ChairYoga,
      Walking: WorkoutTypeEnum.Walking,
      Military: WorkoutTypeEnum.Military,
      Calisthenics: WorkoutTypeEnum.Calisthenics,
      Pelvic: WorkoutTypeEnum.PelvicWellness,
    }

    return (userProgram && mapping[userProgram]) || WorkoutTypeEnum.AsianPilates
  }, [userProgram])

  // return
  return (
    <div className={'grid gap-[22px] h-screen p-6 pt-1 grid-rows-[1fr_auto] max-w-content w-full'}>
      <div className={'grid items-end justify-items-center w-full h-full overflow-hidden relative'}>
        <Link
          className="absolute top-1 right-[14px]  flex items-center justify-center w-[32px] h-[32px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#00000008] z-20"
          to={ROUTES.LOGIN}
        >
          <IconSVG type={'CLOSE'} height={16} width={16} fill={'#B7BABE'} />
        </Link>

        <ImageComponent src={limitedImg} className={'max-w-[254px] h-[362px]'} />

        <div
          className={
            'absolute bottom-0 left-0 w-full h-[100px] bg-[linear-gradient(180deg,rgba(249,250,251,0)_0%,#F9FAFB_100%)]'
          }
        />
      </div>

      <div className={'grid gap-4 text-center'}>
        <h3 className={'font-semibold text-xl3'}>{t('noActiveSubscription')}</h3>

        <p className={'text-xl text-secondary'}>{t('completeQuizForAccess')}</p>

        <Button
          onClick={() =>
            (window.location.href = `${OTP_LINK}/${programType}/v1/?utm_source=web_app`)
          }
        >
          {t('startQuiz')}
        </Button>
      </div>
    </div>
  )
}

export default LimitedPage
