import React, { FC, useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import { IconSVG } from '@/components/IconSvg/IconSvg'
import usePlans from '@/hooks/usePlans'
import { EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { clsx } from 'clsx'
import { Plan } from '@/types/interfaces'
import ModalEditPlan from '@/components/pages/PersonalPlanSettings/components/ModalEditPlan/ModalEditPlan'
import useProgressPersonalTraining from '@/hooks/usePatchPersonalTraining'
import usePatchProgressPersonalTrainingMutation from '@/hooks/usePatchProgressPersonalTrainingMutation'
import Header from '@/components/Header/Header'

// interface
interface IPersonalPlanSettingsProps {}

const fitnessLevelStoreName = 'fitnessLevel'
const keyCollapsePlan = 'plan'
const keyCollapseLevel = 'level'

// component
const PersonalPlanSettings: FC<Readonly<IPersonalPlanSettingsProps>> = () => {
  const navigate = useNavigate()
  const { data } = usePlans()
  const { t } = useTranslation()
  const [isLoadingState, setIsLoadingState] = useState(false)

  const [activeKeyCollapse, setActiveKeyCollapse] = useState<string | undefined>('plan')
  const [openModalType, setOpenModalType] = useState<'update' | 'restart' | 'error' | undefined>()

  const [initialSlide, setInitialSlide] = useState<number>(0)
  const [currentPlan, setCurrentPlan] = useState<Plan>()
  const userProgram = localStorage.getItem('userProgram')
  const { mutate, isLoading, error } = useProgressPersonalTraining()
  const {
    mutate: mutateRestart,
    isLoading: isLoadingRestart,
    error: errorRestart,
  } = usePatchProgressPersonalTrainingMutation()

  const [initialSlideLevel, setInitialSlideLevel] = useState<number>(1)
  const [currentLevel, setCurrentLevel] = useState<{ key: string; name: string }>()
  const fitnessLevel = localStorage.getItem(fitnessLevelStoreName)

  const FitnessLevels = [
    { key: 'beginner', name: t('fitnessLevel.beginner') },
    { key: 'intermediate', name: t('fitnessLevel.intermediate') },
    { key: 'advanced', name: t('fitnessLevel.advanced') },
  ]

  const onActionInModal = () => {
    setOpenModalType(undefined)

    if (openModalType === 'update') {
      mutate(currentPlan?.id || '')
      if (currentLevel?.key) {
        mutateRestart('0')
        localStorage.setItem(fitnessLevelStoreName, currentLevel.key)
      }
    }
    if (openModalType === 'restart') {
      setIsLoadingState(true)
      mutateRestart('0')
    }
  }

  useEffect(() => {
    if (data && userProgram) {
      setInitialSlide(data.findIndex((el) => el.workoutType === userProgram))
      setCurrentPlan(data.find((el) => el.workoutType === userProgram))
    }
  }, [data, userProgram])

  useEffect(() => {
    if (fitnessLevel) {
      setInitialSlideLevel(FitnessLevels.findIndex((el) => el.key === fitnessLevel))
      setCurrentLevel(FitnessLevels.find((el) => el.key === fitnessLevel))
    }
  }, [fitnessLevel])

  useEffect(() => {
    if (error || errorRestart) {
      setOpenModalType('error')
    }
  }, [error, errorRestart])

  // return
  return (
    <>
      <Layout>
        <div className="px-4 overflow-y-auto min-h-full pb-4  overflow-x-hidden">
          <Header
            title={t('personalPlanSettings')}
            onBackClick={() => navigate(-1)}
            showBtn={true}
            isLastQuestion={false}
            fixed={true}
            withShadow={false}
            isTransparent
          />
          <div className="grid gap-4 grid-cols-[100%]">
            <div>
              <h3 className="mt-4 mb-2 px-2 font-medium text-base text-dark">{t('restartPlan')}</h3>

              <div
                className={
                  'grid gap-[20px] rounded-r16 p-4 bg-white shadow-[0px_1px_2px_0px_#0000000A,0px_2px_4px_0px_#00000005]'
                }
              >
                <p className={'text-md text-dark text-center px-10'}>
                  {t('restartPlanDescription')}
                </p>

                <Button
                  variant={'outline'}
                  onClick={() => setOpenModalType('restart')}
                  isLoading={isLoadingState}
                >
                  {t('restartPlan')}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mt-4 mb-2 px-2 font-medium text-base text-dark">{t('updatePlan')}</h3>

              <div
                className={
                  'rounded-r16 py-[4px] px-3 bg-white shadow-[0px_1px_2px_0px_#0000000A,0px_2px_4px_0px_#00000005]'
                }
              >
                <div
                  className={
                    'py-4 px-2 border-b border-border1 grid grid-cols-[1fr_auto_auto] items-center gap-3 text-base1   active:scale-95 transition'
                  }
                  onClick={() =>
                    setActiveKeyCollapse(
                      activeKeyCollapse === keyCollapsePlan ? undefined : keyCollapsePlan,
                    )
                  }
                >
                  <p className={'font-medium'}>{t('workoutPlan')}</p>

                  <p className={'text-md'}>{currentPlan?.name}</p>

                  <div className={'rotate-180'}>
                    <IconSVG type={'ARROW_BACK'} stroke={'#9EA1AD'} fill={'black'} />
                  </div>
                </div>

                {data && (
                  <div
                    className={clsx(
                      'grid transition-[grid-template-rows] duration-300 ease-in-out',
                      activeKeyCollapse === keyCollapsePlan ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    )}
                  >
                    <div className={'overflow-hidden relative'}>
                      <Swiper
                        effect={'coverflow'}
                        direction={'vertical'}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        speed={1000}
                        coverflowEffect={{
                          rotate: 0,
                          stretch: 0,
                          depth: 200,
                          slideShadows: false,
                        }}
                        modules={[EffectCoverflow]}
                        initialSlide={initialSlide}
                        key={initialSlide}
                        className={'w-full h-[101px] mb-1 overflow-visible z-20'}
                        onSlideChange={(e) => {
                          setCurrentPlan(data[e.activeIndex])
                        }}
                      >
                        {data.map((plan, key) => (
                          <SwiperSlide key={`${key}-slide-plan`} className={'h-[36px]'}>
                            <p
                              className={clsx('text-base text-center', {
                                'font-medium': currentPlan?.id === plan.id,
                              })}
                            >
                              {plan.name}
                            </p>
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      <div
                        className={
                          'w-full h-9 rounded-[7px] bg-[#F2F3F3] absolute top-[26px] left-0 z-10 pointer-events-none'
                        }
                      />
                    </div>
                  </div>
                )}

                <div
                  className={
                    'py-4 px-2 grid grid-cols-[1fr_auto_auto]   items-center gap-3 text-base1   active:scale-95 transition'
                  }
                  onClick={() =>
                    setActiveKeyCollapse(
                      activeKeyCollapse === keyCollapseLevel ? undefined : keyCollapseLevel,
                    )
                  }
                >
                  <p className={'font-medium'}>{t('fitnessLevelTitle')}</p>

                  <p>{currentLevel?.name}</p>

                  <div className={'rotate-180'}>
                    <IconSVG type={'ARROW_BACK'} stroke={'#9EA1AD'} fill={'black'} />
                  </div>
                </div>

                <div
                  className={clsx(
                    'grid transition-[grid-template-rows] duration-300 ease-in-out',
                    activeKeyCollapse === keyCollapseLevel ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className={'overflow-hidden relative '}>
                    <Swiper
                      effect={'coverflow'}
                      direction={'vertical'}
                      centeredSlides={true}
                      slidesPerView={'auto'}
                      speed={1000}
                      coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 200,
                        slideShadows: false,
                      }}
                      modules={[EffectCoverflow]}
                      initialSlide={initialSlideLevel}
                      key={initialSlideLevel}
                      className={
                        'border-t border-border1 w-full h-[101px] mb-1 overflow-visible z-20'
                      }
                      onSlideChange={(e) => {
                        setCurrentLevel(FitnessLevels[e.activeIndex])
                      }}
                      s
                    >
                      {FitnessLevels.map((level, key) => (
                        <SwiperSlide key={`${key}-slide-plan-${level.key}`} className={'h-[36px]'}>
                          <p
                            className={clsx('text-base text-center', {
                              'font-medium': currentLevel?.key === level.key,
                            })}
                          >
                            {level.name}
                          </p>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <div
                      className={
                        'w-full h-9 rounded-[7px] bg-[#F2F3F3] absolute top-[26px] left-0 z-10'
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button variant={'outline'} onClick={() => navigate(-1)}>
              {t('cancel')}
            </Button>

            <Button
              onClick={() => setOpenModalType('update')}
              isLoading={isLoading || isLoadingRestart}
            >
              {t('updatePlan')}
            </Button>
          </div>
        </div>
      </Layout>

      <ModalEditPlan
        type={openModalType}
        isOpenModal={!!openModalType}
        onClose={() => setOpenModalType(undefined)}
        onAction={onActionInModal}
      />
    </>
  )
}

export default PersonalPlanSettings
