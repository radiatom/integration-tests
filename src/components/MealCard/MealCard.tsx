import React, { FC } from 'react'
import { RecipeData } from '@/types/interfaces'
import Badge from '@/components/Badge/Badge'
import { ROUTES } from '@/constants/routes'
import { Link } from 'react-router-dom'
import { IconSVG } from '@/components/IconSvg/IconSvg'
import ImageComponent from '@/components/ImageComponent/ImageComponent'

// interface
interface IMealCardProps {
  meal: RecipeData
}

// component
const MealCard: FC<Readonly<IMealCardProps>> = ({ meal }) => {
  // return
  return (
    <Link
      to={`${ROUTES.MEALS}/${meal.id}`}
      className={
        'grid gap-3 p-3 bg-white shadow-[0_1px_4px_0_#0000000A] rounded-r12 active:scale-95 transition'
      }
    >
      <div className={'w-full h-[214px] relative'}>
        <Badge text={meal.mealType} classNameWrapper={'absolute top-2 left-2'} />

        <ImageComponent
          src={meal.cover}
          className={'w-full h-full rounded-[7px] object-cover'}
          alt={`${meal.name} card`}
        />
      </div>

      <div>
        <p className={'font-semibold text-xl text-[#17181D] pb-[8px]'}>{meal.name}</p>

        <div className={'flex gap-8 items-center text-secondary font-semibold text-md'}>
          <p className={'grid grid-cols-[auto_auto] gap-[6px] items-center'}>
            <IconSVG type={'KCAL'} stroke={'#5F626F'} />
            <span>{meal.kCal} Kcal</span>
          </p>

          <p className={'grid grid-cols-[auto_auto] gap-[6px] items-center'}>
            <IconSVG type={'CLOCK'} fill={'#5F626F'} />

            <span>{meal.cookTime}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default MealCard
