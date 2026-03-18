import React, { FC, useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import CompletedWorkoutSvg from '@/assets/images/svg/completed-workout.svg'
import BlockedWorkoutSvg from '@/assets/images/svg/blocked-workout.svg'
import WorkoutKcalSvg from '@/assets/images/svg/workout-kcal.svg'
import WorkoutTimeSvg from '@/assets/images/svg/workout-time.svg'
import InfoSvg from '@/assets/images/svg/info.svg'
import { ROUTES } from '@/constants/routes'
import { useNavigate } from 'react-router-dom'
import HeadPlan from '@/components/pages/PlanPage/components/HeadPlan'
import usePersonalTraining from '@/hooks/usePersonalTraining'
import { Loader } from '@/components/Loader/Loader'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Thumbs } from 'swiper/modules'
import useWorkout from '@/hooks/useWorkout'
import { WorkoutData } from '@/types/interfaces'
import { Button } from '@/components/Button/Button'
import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'
import { usePwaInstalled } from './hooks/usePwaInstalled'
import { PwaModalInfo } from '@/components/pages/PlanPage/components/PwaModalInfo'
import { androidConfig, iosConfig } from '@/components/pages/PlanPage/config'
import { usePwaInstallPrompt } from '@/components/pages/PlanPage/hooks/usePwaInstallPrompt'
import { getPlatform } from '@/components/pages/PlanPage/helpers/getPlatform'
import { STEPS, TStepItem } from './types'
import ImageComponent from '@/components/ImageComponent/ImageComponent'

const PLATFORM = {
  IOS: 'ios',
  ANDROID: 'android',
} as const

// interface
interface IPlanPageProps {}

// component
const PlanPage: FC<Readonly<IPlanPageProps>> = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperRef['swiper'] | null>(null)
  const [thumbsSwiperSecond, setThumbsSwiperSecond] = useState<SwiperRef['swiper'] | null>(null)
  const [initialSlide, setInitialSlide] = useState<number>(0)
  const [workouts, setWorkouts] = useState<undefined | WorkoutData[]>()
  const [openedWorkout, setOpenedWorkout] = useState<string | undefined>()

  const { data, isLoading } = usePersonalTraining()
  const { data: workoutData } = useWorkout(openedWorkout, false)

  const { hasEverInstalled } = usePwaInstalled()

  const { isOpen, close } = usePwaInstallPrompt(hasEverInstalled)

  const statusWorkout = (numberToCheck: number): 'blocked' | 'completed' | 'opened' => {
    const targetNumber = data?.ProgressPersonalTraining.trainingIndex || 0

    if (numberToCheck > targetNumber) {
      return 'blocked'
    } else if (numberToCheck < targetNumber) {
      return 'completed'
    } else {
      return 'opened'
    }
  }

  useEffect(() => {
    if (data?.PersonalTraining.workouts) {
      setWorkouts(
        data.PersonalTraining.workouts.map((el) => {
          return {
            id: el,
            name: '',
            cover: '',
            calories: '',
            duration: '',
          } as WorkoutData
        }),
      )
      setOpenedWorkout(data.PersonalTraining.workouts[data.ProgressPersonalTraining.trainingIndex])
      setInitialSlide(data.ProgressPersonalTraining.trainingIndex || 0)
    }
  }, [data])

  useEffect(() => {
    if (workoutData && workouts) {
      setWorkouts(
        workouts.map((item) =>
          item.id === workoutData.page.id
            ? {
                ...item,
                cover: workoutData.page.cover,
                name: workoutData.page.name,
                duration: workoutData.page.duration,
                calories: workoutData.page.calories,
              }
            : item,
        ),
      )
    }
  }, [workoutData])

  const platform = getPlatform()

  const info =
    platform === PLATFORM.IOS ? iosConfig : platform === PLATFORM.ANDROID ? androidConfig : null

  const steps: TStepItem[] = [
    { type: STEPS.COPY },
    ...(info?.list ? info.list.map((item) => ({ type: STEPS.TEXT, ...item })) : []),
  ]

  return (
    <>
      {info && (
        <PwaModalInfo
          title={info.title}
          subtitle={info.subtitle}
          thumbnail={info.thumbnail}
          steps={steps}
          onClose={() => close()}
          isOpen={isOpen}
        />
      )}
      <Layout>
        <HeadPlan />

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {workouts && (
              <div>
                <Swiper
                  modules={[Thumbs]}
                  onSwiper={setThumbsSwiper}
                  onSlideChange={(e: any) => {
                    thumbsSwiperSecond?.slideTo(e.activeIndex)
                  }}
                  className={'w-full mt-[-62px] h-[325px] overflow-visible'}
                >
                  {workouts.map((workout, key) => (
                    <SwiperSlide key={`${key}-slide-workout `}>
                      <div className={'h-[280px] relative overflow-hidden rounded-[32px] '}>
                        {statusWorkout(key) === 'completed' && (
                          <div
                            className={
                              'absolute top-0 left-0 w-full h-full bg-[linear-gradient(360deg,#13D16A_-24.65%,rgba(50,232,133,0)_110.47%)]'
                            }
                          />
                        )}

                        {statusWorkout(key) === 'blocked' && (
                          <div
                            className={
                              'grid items-center justify-items-center absolute top-0 left-0 w-full h-full bg-[#E5E5E599] z-10'
                            }
                          >
                            <img
                              src={BlockedWorkoutSvg}
                              alt={'blocked workout cover'}
                              width={56}
                              height={56}
                            />
                          </div>
                        )}

                        <ImageComponent src={workout.cover} alt={workout.name} />

                        <div
                          className={
                            'absolute bottom-0 left-0 w-full pt-[95px] px-[27px] pb-[27px] text-white font-semibold bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.00691776)_6.67%,rgba(0,0,0,0.028408)_13.33%,rgba(0,0,0,0.0653279)_20%,rgba(0,0,0,0.117929)_26.67%,rgba(0,0,0,0.18542)_33.33%,rgba(0,0,0,0.265507)_40%,rgba(0,0,0,0.354153)_46.67%,rgba(0,0,0,0.445847)_53.33%,rgba(0,0,0,0.534493)_60%,rgba(0,0,0,0.61458)_66.67%,rgba(0,0,0,0.682071)_73.33%,rgba(0,0,0,0.734672)_80%,rgba(0,0,0,0.771592)_86.67%,rgba(0,0,0,0.793082)_93.33%,rgba(0,0,0,0.8)_100%)]'
                          }
                        >
                          {statusWorkout(key) === 'completed' && (
                            <p className={'text-base text-center mb-[4px]'}>{t('completed')}</p>
                          )}

                          <h3 className={'text-xl3 text-center'}>{workout.name}</h3>
                        </div>
                      </div>

                      <div className={'flex relative justify-around mt-[-17px] z-10 '}>
                        {workout.duration && (
                          <div className={'grid justify-items-center gap-[5px] h-fit'}>
                            <img
                              src={WorkoutTimeSvg}
                              alt={'completed workout'}
                              width={32}
                              height={32}
                              className={
                                'rounded-full shadow-[0px_4px_8px_0px_#14BD4C33,0px_14px_14px_0px_#14BD4C2B,0px_32px_19px_0px_#14BD4C1A,0px_57px_23px_0px_#14BD4C08,0px_89px_25px_0px_#14BD4C00]'
                              }
                            />

                            <p className={'font-bold text-xl2'}>{workout.duration}</p>
                          </div>
                        )}

                        {workout.calories && (
                          <div className={'grid justify-items-center gap-[5px] h-fit'}>
                            <img
                              src={WorkoutKcalSvg}
                              alt={'completed workout'}
                              width={32}
                              height={32}
                              className={
                                'rounded-full shadow-[0px_4px_8px_0px_#14BD4C33,0px_14px_14px_0px_#14BD4C2B,0px_32px_19px_0px_#14BD4C1A,0px_57px_23px_0px_#14BD4C08,0px_89px_25px_0px_#14BD4C00]'
                              }
                            />

                            <p className={'font-bold text-xl2'}>{workout.calories} Kcal</p>
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <Swiper
                  effect={'coverflow'}
                  centeredSlides={true}
                  speed={1000}
                  slidesPerView={'auto'}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 20,
                    depth: 120,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  modules={[EffectCoverflow, Thumbs]}
                  initialSlide={initialSlide}
                  key={initialSlide}
                  className={'pt-5 pb-6 w-full'}
                  onSwiper={setThumbsSwiperSecond}
                  onSlideChange={(e) => {
                    setOpenedWorkout(workouts[e.activeIndex].id)
                  }}
                  thumbs={{ swiper: thumbsSwiper }}
                >
                  {workouts.map((workout, key) => (
                    <SwiperSlide
                      key={`${key}-slide-day`}
                      className={clsx(
                        'grid w-[80px] h-[80px] gap-[5px] rounded-full border-[3px] border-[#F8F8F8] bg-white justify-items-center p-[3px] shadow-[0px_4px_8px_0px_#BBBBBB33,0px_14px_14px_0px_#C6C6C62B]',
                        { 'border-green': statusWorkout(key) === 'opened' },
                      )}
                    >
                      <p
                        className={`text-xl45 text-center font-bold leading-[120%] ${statusWorkout(key) === 'blocked' && openedWorkout !== workout.id && 'opacity-70'}`}
                      >
                        {key + 1}
                      </p>

                      {statusWorkout(key) === 'completed' && (
                        <img
                          src={CompletedWorkoutSvg}
                          alt={'completed workout'}
                          width={18}
                          height={18}
                        />
                      )}

                      {statusWorkout(key) === 'opened' && (
                        <p className={'text-xs2_1 font-semibold'}>{t('day')}</p>
                      )}

                      {statusWorkout(key) === 'blocked' && (
                        <img
                          src={BlockedWorkoutSvg}
                          alt={'blocked workout'}
                          className={openedWorkout !== workout.id ? 'opacity-70' : ''}
                          width={18}
                          height={18}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>

                {workoutData && data && (
                  <div className={'px-4'}>
                    {statusWorkout(workouts.findIndex((el) => el.id === workoutData.page.id)) ===
                      'opened' ||
                    statusWorkout(workouts.findIndex((el) => el.id === workoutData.page.id)) ===
                      'completed' ? (
                      <Button
                        onClick={() => {
                          localStorage.setItem(
                            'trainingIndex',
                            data.ProgressPersonalTraining.trainingIndex + 1 ===
                              data?.PersonalTraining.workouts.length
                              ? '0'
                              : data.ProgressPersonalTraining.trainingIndex + 1 + '',
                          )
                          navigate(`${ROUTES.PLAN}/${workoutData.page.id}`)
                        }}
                      >
                        {t('goToWorkout')}
                      </Button>
                    ) : (
                      <div
                        className={
                          'grid grid-cols-[auto_1fr] items-center gap-2 mx-2 py-[22px] px-6'
                        }
                      >
                        <img src={InfoSvg} alt={'info'} width={20} height={20} />

                        <p className={'text-md font-medium tracking-[-0.2px]  text-[#5F6271]'}>
                          {t('pleaseFinishPreviousDay')}
                          <span
                            onClick={() =>
                              thumbsSwiper?.slideTo(data.ProgressPersonalTraining.trainingIndex)
                            }
                            className={'text-green'}
                          >
                            {t('backToToday')}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Layout>
    </>
  )
}

export default PlanPage
