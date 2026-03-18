import React, { FC } from 'react'
import { Button } from '@/components/Button/Button'
import { IconSVG } from '@/components/IconSvg/IconSvg'

// interface
export interface IModalProps {
  onClose: () => void
  svg: string
  onWhiteButtonClick: () => void
  textInWhiteButton: string
  onGreenButtonClick: () => void
  textInGreenButton: string
  isOpenModal: boolean
  title: string
  description: string
}

// component
const ModalQuestionInChallenge: FC<Readonly<IModalProps>> = ({
  onClose,
  svg,
  isOpenModal,
  onWhiteButtonClick,
  textInWhiteButton,
  onGreenButtonClick,
  textInGreenButton,
  description,
  title,
}) => {
  // return
  return (
    <div
      className={`grid items-end fixed top-0 left-0 w-full min-h-full bg-[rgba(41,41,58,0.23)] z-40 ${!isOpenModal && 'hidden'}`}
    >
      <div
        className={
          'grid px-6 grid-rows-[auto_auto_1fr_auto] relative justify-items-center gap-2 min-h-[337px] rounded-[32px_32px_0_0] bg-white shadow-lg overflow-hidden p-4 pt-[52px]'
        }
      >
        <div
          className="absolute top-3 left-3 cursor-pointer flex items-center justify-center w-[32px] h-[32px] rounded-full transition active:scale-95 bg-[#00000008] z-50 text-dark"
          onClick={() => onClose()}
        >
          <IconSVG type={'CLOSE'} height={16} width={16} fill={'#B7BABE'} />
        </div>

        <img src={svg} alt={title} className={'h-[104px]'} />

        <h4 className={'font-semibold text-xl4m text-center text-dark'}>{title}</h4>

        <p className={' mb-10 text-secondary text-center'}>{description}</p>

        <div className={'grid grid-cols-[1fr_1fr] gap-4 w-full'}>
          <Button variant={'outline'} onClick={() => onWhiteButtonClick()}>
            {textInWhiteButton}
          </Button>

          <Button onClick={() => onGreenButtonClick()}>{textInGreenButton}</Button>
        </div>
      </div>
    </div>
  )
}

export default ModalQuestionInChallenge
