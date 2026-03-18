import React, { FC } from 'react'

// interface
interface ICountExercisesProps {
  count: number
  activeNumber: number
}

// component
const CountExercises: FC<Readonly<ICountExercisesProps>> = ({ count, activeNumber }) => {
  // return
  return (
    <div className={'w-full flex justify-between -mx-px p-[8px] pb-[23px]'}>
      {Array(count)
        .fill(null)
        .map((_, key) => (
          <div
            className={' rounded-full mx-px h-[6px]'}
            key={`${key}-count`}
            style={{
              width: `${Math.floor(100 / count)}%`,
              backgroundColor: activeNumber < key ? '#EDF1F5' : '#1AC760',
            }}
          />
        ))}
    </div>
  )
}

export default CountExercises
