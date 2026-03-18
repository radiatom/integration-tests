import React, { FC } from 'react'
import { clsx } from 'clsx'
import SuccessSvg from '@/assets/images/fasting/done.svg'
import { useTranslation } from 'react-i18next'
import { FastingModel } from '@/components/pages/FastingPage/types'

// interface
interface ISuccessChangeModelProps {
  model: FastingModel
  isOpen: boolean
}

// component
const SuccessChangeModel: FC<Readonly<ISuccessChangeModelProps>> = ({ model, isOpen }) => {
  const { t } = useTranslation()

  // return
  return (
    <div
      className={clsx(
        'fixed top-0 left-0 w-full h-full grid items-center justify-items-center  transition  pointer-events-none',
        { 'opacity-0': !isOpen },
        { 'opacity-100': isOpen },
      )}
    >
      <div
        className={
          'grid justify-items-center gap-[23px] w-[208px] pt-[53px] px-[22px] pb-[33px] rounded-[17px] bg-[#585858B2]'
        }
      >
        <img src={SuccessSvg} alt="success" />

        <p className={'text-xl2 text-white font-bold text-center'}>
          {t('fastingTypeChanged', { name: `${model.fastingDuration}:${model.eatingDuration}` })}
        </p>
      </div>
    </div>
  )
}

export default SuccessChangeModel
