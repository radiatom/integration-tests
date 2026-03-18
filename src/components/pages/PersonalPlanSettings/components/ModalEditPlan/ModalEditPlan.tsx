import React, { FC } from 'react'
import EndWorkoutSvg from '@/assets/images/svg/end-workout.svg'
import ErrorEditPlanSvg from '@/assets/images/svg/error-modal-update-plan.svg'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import { IconSVG } from '@/components/IconSvg/IconSvg'

// interface
export interface IModalProps {
  onClose: () => void
  onAction?: () => void
  isOpenModal: boolean
  type?: 'update' | 'restart' | 'error'
}

// component
const ModalEditPlan: FC<Readonly<IModalProps>> = ({ onClose, isOpenModal, type, onAction }) => {
  const { t } = useTranslation()

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
          onClick={onClose}
          className="absolute top-3 left-3 cursor-pointer flex items-center justify-center w-[32px] h-[32px] rounded-full transition active:scale-95 bg-[#00000008] z-50 text-dark"
        >
          <IconSVG type={'CLOSE'} height={16} width={16} fill={'#B7BABE'} />
        </div>

        <img
          src={type === 'error' ? ErrorEditPlanSvg : EndWorkoutSvg}
          alt={'edit plan'}
          className={'h-[104px]'}
        />

        <h4
          className={`font-semibold text-xl4 text-center text-dark ${type === 'error' && 'max-w-[230px]'}`}
        >
          {type === 'update' && t('updateYourPlan')}
          {type === 'restart' && t('restartYourPlan')}
          {type === 'error' && t('oopsSomethingWentWrong')}
        </h4>

        {(type === 'update' || type === 'restart') && (
          <p className={'text-base2 text-secondary text-center'}>
            {t('yourPreviousProgressWillBeLost')}
          </p>
        )}

        {type === 'error' && (
          <div className={'grid justify-items-center h-fit'}>
            <p className={'text-base2 text-secondary text-center '}>
              {t('pleaseCheckAgainOrContactSupport')}
            </p>

            <a
              href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`}
              target={'_blank'}
              rel="noreferrer"
              className={'text-green3'}
            >
              {process.env.REACT_APP_SUPPORT_EMAIL}
            </a>
          </div>
        )}

        {(type === 'update' || type === 'restart') && (
          <div className={'grid grid-cols-[1fr_1fr] gap-4 w-full'}>
            <Button variant={'outline'} onClick={onClose}>
              {t('cancel')}
            </Button>

            <Button onClick={onAction}>
              {type === 'update' && t('update')}
              {type === 'restart' && t('restart')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalEditPlan
