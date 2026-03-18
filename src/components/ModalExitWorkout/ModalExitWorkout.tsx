import React, { FC, useState } from 'react'
import EndWorkoutSvg from '@/assets/images/svg/end-workout.svg'
import WorkoutNotComplitedSvg from '@/assets/images/svg/workout-not-complited.svg'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { IconSVG } from '@/components/IconSvg/IconSvg'

// interface
export interface IModalProps {
  onClose: () => void
  isOpenModal: boolean
  isCompletedWorkout?: boolean
}

// component
const ModalExitWorkout: FC<Readonly<IModalProps>> = ({
  onClose,
  isOpenModal,
  isCompletedWorkout,
}) => {
  const { t } = useTranslation()
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  // return
  return (
    <div
      className={`grid items-end fixed top-0 left-0 w-full min-h-full bg-[rgba(41,41,58,0.23)] z-40 ${!isOpenModal && 'hidden'}`}
    >
      <div
        className={
          'grid grid-rows-[auto_auto_1fr_auto] relative justify-items-center gap-2 min-h-[337px] rounded-[32px_32px_0_0] bg-white shadow-lg overflow-hidden p-4 pt-[52px]'
        }
      >
        <div
          className="absolute top-3 left-3 cursor-pointer flex items-center justify-center w-[32px] h-[32px] rounded-full transition active:scale-95 bg-[#00000008] z-50 text-dark"
          onClick={error ? () => navigate(-1) : () => onClose()}
        >
          <IconSVG type={'CLOSE'} height={16} width={16} fill={'#B7BABE'} />
        </div>

        <img
          src={error ? WorkoutNotComplitedSvg : EndWorkoutSvg}
          alt={'End Workout'}
          className={'h-[104px]'}
        />

        <h4 className={'font-semibold text-xl4 text-center text-dark'}>
          {error ? t('workoutNotCompleted') : t('endWorkoutQuestion')}
        </h4>

        <p className={'text-base2 text-secondary text-center'}>
          {error ? t('endJustAFewMoreSteps') : t('areYouSureEndWorkout')}
        </p>

        {error ? (
          <Button
            onClick={() => {
              navigate(-1)
              localStorage.removeItem('trainingIndex')
            }}
          >
            {t('ok')}
          </Button>
        ) : (
          <div className={'grid grid-cols-[1fr_1fr] gap-4 w-full'}>
            <Button
              variant={'outline'}
              onClick={() => (isCompletedWorkout ? navigate(-1) : setError(true))}
            >
              {t('endWorkout')}
            </Button>

            <Button onClick={() => onClose()}>{t('keepGoing')}</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalExitWorkout
