import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import mainGoalSvg from '@/assets/images/svg/main-goal.svg'
import targetWeightSvg from '@/assets/images/svg/target-weight.svg'
import settingsSvg from '@/assets/images/svg/plan-settings.svg'
import { ROUTES } from '@/constants/routes'
import { useTranslation } from 'react-i18next'
import useProfile from '@/hooks/useProfile'
import { updateSentryUser } from '@/services/analytics/sentry-init'
import { Loader } from '@/components/Loader/Loader'

// interface
interface IHeadPlanProps {}

// component
const HeadPlan: FC<Readonly<IHeadPlanProps>> = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useProfile()
  useEffect(() => {
    if (data) {
      updateSentryUser({
        ...(data.id && { id: data.id }),
        ...(data.email && { email: data.email }),
        ...(data.userName && { username: data.userName }),
      })
    }
  }, [data])

  // return
  return (
    <div className={'rounded-[0_0_32px_32px] bg-white z-10'}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={'grid grid-cols-[1fr_auto] items-center pl-7 pr-5 py-[10px] mb-4'}>
            <h4 className={'text-xl45 font-bold text-dark'}>
              {t('myPlan')} <span className={'text-green'}>{t('myPlan2')}</span>
            </h4>

            {/* <Link to={`${ROUTES.PROFILE}`} className={'active:scale-95 transition'}> */}
            {/*  <Avatar name={data.userName} isSmall linkImg={data.avatar} /> */}
            {/* </Link> */}
            <Link
              to={`${ROUTES.PERSONAL_PLAN_SETTINGS}`}
              className={
                'grid items-center justify-items-center w-8 h-8 active:scale-95 transition'
              }
            >
              <img src={settingsSvg} alt={'settings'} />
            </Link>
          </div>

          <div className={'grid grid-cols-[1fr_auto] gap-1 px-7 pb-8'}>
            <div className={'grid grid-cols-[auto_auto] gap-2 items-center w-fit'}>
              <img src={mainGoalSvg} width={32} height={32} alt={'mainGoal'} />

              <div className={'text-base '}>
                <p className={'font-semibold text-[#89939B] leading-4'}>{t('mainGoal')}</p>
                <p className={'font-bold text-dark leading-4'}>
                  {localStorage.getItem('mainGoal')}
                </p>
              </div>
            </div>

            <div className={'grid grid-cols-[auto_auto] gap-2 items-center w-fit'}>
              <img src={targetWeightSvg} width={32} height={32} alt={'targetWeight'} />

              <div className={'text-base '}>
                <p className={'font-semibold text-[#89939B] leading-4'}>{t('targetWeight')}</p>
                <p className={'font-bold text-dark leading-4'}>{data?.targetWeight}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default HeadPlan
