import React, { Fragment, useState } from 'react'
import Layout from '@/components/Layout'
import { useTranslation } from 'react-i18next'
import { Loader } from '@/components/Loader/Loader'
import { useNavigate, useParams } from 'react-router-dom'
import useWorkout from '@/hooks/useWorkout'
import { IconSVG } from '@/components/IconSvg/IconSvg'
import { Button } from '@/components/Button/Button'
import ExerciseCard from '@/components/ExerciseCard/ExerciseCard'
import { useInView } from '@/hooks/useInView'
import { clsx } from 'clsx'
import Exercises from '@/components/pages/WorkoutPage/components/Exercises/Exercises'
import Player from '@/components/pages/WorkoutPage/components/Player/Player'
import WalkingTimer from '@/components/pages/WorkoutPage/components/WalkingTimer/WalkingTimer'
import ImageComponent from '@/components/ImageComponent/ImageComponent'

// component
const WorkoutPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { idWorkout } = useParams()
  const { isVisible: isVisibleBtn, ref } = useInView(true)
  const [isOpenExercises, setIsOpenExercises] = useState(false)

  const { data, isLoading } = useWorkout(idWorkout, true)
  const workout = data?.page

  // return
  return (
    <Layout>
      {isLoading ? (
        <div className={'p-4'}>
          <Loader />
        </div>
      ) : (
        <>
          {workout && (
            <div className={'grid grid-rows-[auto_1fr] h-full overflow-y-auto overflow-x-hidden'}>
              <div
                className="absolute top-4 left-4  flex items-center justify-center w-[48px] h-[48px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#0000003D] z-20"
                onClick={() => navigate(-1)}
              >
                <IconSVG type={'ARROW_BACK'} height={24} width={24} fill={'red'} stroke={'white'} />
              </div>

              <div className={'relative w-full h-[457px] '}>
                <ImageComponent
                  src={workout.cover}
                  className={'w-full h-full  object-cover'}
                  alt={`${workout.name} img`}
                />

                <div className={'bg-black opacity-20 absolute top-0 left-0 w-full h-full'} />

                <div
                  className={
                    'absolute bottom-0 left-0 w-full pt-[110px] px-[20px] pb-[60px] bg-[linear-gradient(0deg,rgba(0,0,0,0.91)_15.51%,rgba(0,0,0,0)_100%)] opacity-80'
                  }
                >
                  <div className={'grid w-fit mb-[9px] grid-cols-[auto_auto] items-center gap-8'}>
                    <div className={'grid items-center grid-cols-[auto_1fr] gap-[6px] '}>
                      <IconSVG type={'VOLT'} fill={'white'} />
                      <p className={'text-white font-semibold text-md'}>{workout.calories} Kcal</p>
                    </div>

                    <div className={'grid items-center grid-cols-[auto_1fr] gap-[6px] '}>
                      <IconSVG type={'CLOCK'} fill={'white'} />
                      <p className={'text-white font-semibold text-md'}>{workout.duration}</p>
                    </div>
                  </div>

                  <h3 className={'text-white font-semibold text-xl4'}>{workout.name}</h3>
                </div>
              </div>

              <div className={'mt-[-40px] rounded-[32px_32px_0_0] bg-[#F9FAFB] p-4 z-10'}>
                <Button ref={ref} onClick={() => setIsOpenExercises(true)}>
                  {t('startWorkout')}
                </Button>

                {workout.equipment && (
                  <>
                    <h4 className={'font-medium text-base text-dark mt-4 mb-2 px-2'}>
                      {t('equipment')}
                    </h4>

                    <p className={'text-secondary font-semibold text-xs px-2 mb-6'}>
                      {workout.equipment}
                    </p>
                  </>
                )}

                <h4 className={'font-medium text-base text-dark mt-4 mb-2 px-2'}>
                  {t('focusZones')}
                </h4>

                <p className={'text-secondary font-semibold text-xs px-2 mb-8'}>
                  {workout.zones.map((el, key) => (
                    <Fragment key={`${key}-${el}`}>
                      {el.name} {workout.zones.length > key + 1 ? ', ' : ''}
                    </Fragment>
                  ))}
                </p>

                {workout.exercises.length > 1 && (
                  <h4 className={'font-medium text-base text-dark mb-2 px-2'}>
                    {t('actions')} ({workout.exercises.length})
                  </h4>
                )}

                <div className={'grid gap-2 pb-[70px]'}>
                  {workout.exercises.map((exercise, key) => (
                    <ExerciseCard exercise={exercise} key={`${key}-${exercise.id}`} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div
        className={clsx(
          'absolute bottom-0 left-0 w-full  bg-white p-4 rounded-[32px_32px_0_0] z-10 shadow-[0px_4px_44px_0px_#0000001A] transition',
          {
            'translate-y-[1%]': !isVisibleBtn,
          },
          {
            'translate-y-[100%]': isVisibleBtn,
          },
        )}
      >
        <Button onClick={() => setIsOpenExercises(true)}>{t('startWorkout')}</Button>
      </div>

      {workout && workout.formatType === 'Video' && (
        <Exercises workout={workout} isOpen={isOpenExercises} />
      )}

      {workout && workout.formatType === 'LongVideo' && (
        <Player workout={workout} isOpen={isOpenExercises} />
      )}

      {workout && workout.formatType === 'Timer' && (
        <WalkingTimer workout={workout} isOpen={isOpenExercises} />
      )}
    </Layout>
  )
}

export default WorkoutPage
