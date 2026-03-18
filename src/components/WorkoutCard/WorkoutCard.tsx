import React, { FC } from 'react'
import { WorkoutData, WorkoutsGroupsData } from '@/types/interfaces'
import { useTranslation } from 'react-i18next'
import arrowRightSvg from '@/assets/images/svg/arrow-right-green.svg'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import ImageComponent from '@/components/ImageComponent/ImageComponent'

// interface
interface IWorkoutCardProps {
  workoutsGroup?: WorkoutsGroupsData
  workout?: WorkoutData
}

// component
const WorkoutCard: FC<Readonly<IWorkoutCardProps>> = ({ workout, workoutsGroup }) => {
  const { t } = useTranslation()

  const cardData = workout || workoutsGroup
  return (
    <Link
      to={
        workout ? `${ROUTES.PLAN}/${workout.id}` : `${ROUTES.WORKOUTS_GROUPS}/${workoutsGroup?.id}`
      }
      className={
        'min-h-[104px] [box-shadow:0_1px_2px_0_#0000000A,0_2px_4px_0_#00000005] p-3 rounded-r16 bg-white grid grid-cols-[auto_1fr_auto] items-center  gap-5 active:scale-95 transition'
      }
    >
      <ImageComponent
        src={cardData?.cover}
        alt={`${cardData?.name}-card`}
        className={'object-cover h-20 w-20 rounded-r8 transition-opacity duration-300'}
      />

      <div className={'grid gap-1 h-fit'}>
        <p className={'font-semibold text-xl text-dark'}>{cardData?.name}</p>

        {workoutsGroup?.workouts && workoutsGroup?.workouts.length > 0 && (
          <p className={'text-secondary text-base font-medium'}>
            {workoutsGroup?.workouts.length} {t('workouts')}
          </p>
        )}
      </div>

      <div className={'w-10 h-10 rounded-r12 bg-[#E9F9F0] grid items-center justify-items-center '}>
        <img src={arrowRightSvg} width={24} height={24} alt={'arrow-right-green'} />
      </div>
    </Link>
  )
}

export default WorkoutCard
