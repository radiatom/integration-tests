import React, { FC } from 'react'
import CheckSvg from '@/assets/images/svg/Check-Circle-Streamline-Ultimate.svg'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { WorkoutData } from '@/types/interfaces'
import { formatSeconds } from '@/helpers/formatSeconds'
import Fireworks from '@/components/Fireworks/Fireworks'
import AssistantSvg from '@/assets/images/svg/avatar-assistant.svg'
import { Loader } from '@/components/Loader/Loader'
import usePatchProgressPersonalTrainingQuery from '@/hooks/usePatchProgressPersonalTrainingQuery'
import useGetCalories from '@/hooks/useGetCalories/useGetCalories'

// interface
export interface IModalProps {
  workout: WorkoutData
  trainingIndex: string | null
  dateStart?: string
  timeActivity?: number
}

// component
const Congratulations: FC<Readonly<IModalProps>> = ({
  workout,
  dateStart,
  timeActivity,
  trainingIndex,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const now = new Date()
  const start = new Date(dateStart || '')
  const totalTimePassed =
    timeActivity || (dateStart ? Math.floor((now.getTime() - start.getTime()) / 1000) : 0)
  const kcal = useGetCalories(workout, totalTimePassed)
  const { isLoading } = usePatchProgressPersonalTrainingQuery(trainingIndex)

  // return
  return (
    <div
      className={
        'grid items-end justify-items-center fixed top-0 left-0 w-full min-h-full p-4 z-40'
      }
    >
      <Fireworks />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div
            className={
              'grid justify-items-end gap-[19px] absolute right-[16px] top-[11px] max-w-[276px]'
            }
          >
            <div className={'grid items-center gap-[6px] grid-cols-[auto_1fr] px-2'}>
              <p className={'font-semibold text-white text-xs'}>Fit4Me {t('assistant')}</p>

              <img src={AssistantSvg} alt={'Fit4Me Assistant'} className={'w-8 h-8'} />
            </div>

            <p className={'relative rounded-r16 py-2 px-3 bg-white text-md'}>
              {t('yourBodyCanStand')}
              <div
                className="absolute bottom-[99%] right-[30px] w-[13px] h-[13px] bg-white"
                style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
              />
            </p>
          </div>

          <div
            className={
              'grid max-w-[358px] relative justify-items-center gap-4 min-h-[387px] rounded-[40px] bg-white shadow-lg overflow-hidden p-6 pt-8'
            }
          >
            <img src={CheckSvg} alt={'End Workout'} className={'h-[48px]'} />

            <h4 className={'font-semibold text-xl4 text-center text-dark'}>
              {t('congratulations')}
            </h4>

            <p className={'text-base2 text-secondary text-center px-2'}>
              {t('youCompleted')}{' '}
              <span className={'text-dark'}>
                {workout.name} {t('workout')}
              </span>{' '}
              {t('todayText')}
            </p>

            <div className={'grid grid-cols-[1fr_1fr_1fr] w-full gap-[6px]'}>
              <div
                className={
                  'grid items-center justify-items-center h-[88px] w-full rounded-r16 bg-[#F9FAFB] '
                }
              >
                <div className={'grid justify-items-center h-fit'}>
                  <p className={'font-semibold text-xl2 text-dark'}>{kcal}</p>

                  <p className={'text-gray9 font-medium text-xs capitalize'}>Kcal</p>
                </div>
              </div>

              <div
                className={
                  'grid items-center justify-items-center h-[88px] w-full rounded-r16 bg-[#F9FAFB] '
                }
              >
                <div className={'grid justify-items-center h-fit'}>
                  <p className={'font-semibold text-xl2 text-dark'}>
                    {formatSeconds(totalTimePassed)}
                  </p>

                  <p className={'text-gray9 font-medium text-xs capitalize'}>{t('min')}</p>
                </div>
              </div>

              <div
                className={
                  'grid items-center justify-items-center h-[88px] w-full rounded-r16 bg-[#F9FAFB] '
                }
              >
                <div className={'grid justify-items-center h-fit'}>
                  <p className={'font-semibold text-xl2 text-dark'}>{workout.exercises.length}</p>

                  <p className={'text-gray9 font-medium text-xs capitalize'}>{t('actions')}</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                navigate(-1)
              }}
            >
              {t('continue')}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Congratulations
