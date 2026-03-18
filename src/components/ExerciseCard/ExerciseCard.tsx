import React, { FC } from 'react'
import { ExerciseData } from '@/types/interfaces'
import { formatSeconds } from '@/helpers/formatSeconds'
import ImageComponent from '@/components/ImageComponent/ImageComponent'

// interface
interface IExerciseCardProps {
  exercise: ExerciseData
}

// component
const ExerciseCard: FC<Readonly<IExerciseCardProps>> = ({ exercise }) => {
  // return
  return (
    <div
      className={
        '[box-shadow:0_1px_2px_0_#0000000A,0_2px_4px_0_#00000005] p-3 rounded-r16 bg-white grid grid-cols-[auto_1fr] items-center  gap-5 active:scale-95 transition'
      }
    >
      <ImageComponent
        src={exercise.cover}
        className={'rounded-r8 h-20 w-20 object-cover'}
        alt={`${exercise.name}-card`}
      />

      <div className={'grid gap-1 h-fit'}>
        <p className={'font-semibold text-xl text-dark'}>{exercise.name}</p>

        <p className={'text-secondary text-base font-medium'}>
          {formatSeconds(Number(exercise.duration))}
        </p>
      </div>
    </div>
  )
}

export default ExerciseCard
