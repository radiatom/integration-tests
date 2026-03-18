import React, { FC } from 'react'
import { Button } from '@/components/Button/Button'
import { IconSVG } from '@/components/IconSvg/IconSvg'
import useDeleteChallengeMutation from '@/hooks/useDeleteChallengeMutation'
import deleteSvg from '@/assets/images/challenges/delete-in-modal.svg'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import ToastCustom from '@/components/ToastCustom/ToastCustom'

// interface
export interface IModalProps {
  onClose: () => void
  onDelete: () => void
  isOpenModal: boolean
  id: string
}

// component
const ModalQuestionDeleteChallenge: FC<Readonly<IModalProps>> = ({
  onClose,
  isOpenModal,
  onDelete,
  id,
}) => {
  const { t } = useTranslation()
  const { mutate: deleteChallenge } = useDeleteChallengeMutation({
    onSuccess: () => {
      onClose()
      onDelete()
      toast.custom(
        (id) => (
          <ToastCustom idToast={id}>
            <div>
              <p className={'text-[#13A2D1]'}>{t('challengeDeleted')}</p>
              <p className={'text-md text-secondary'}>{t('startAgainAnytime')}</p>
            </div>
          </ToastCustom>
        ),
        { position: 'top-left' },
      )
    },
  })

  const handleDelete = async () => {
    await deleteChallenge(id)
  }

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

        <img src={deleteSvg} alt={'delete'} className={'h-[104px]'} />

        <h4 className={'font-semibold text-xl4m text-center text-dark'}>
          {t('deleteChallengeQuestion')}
        </h4>

        <p className={' mb-10 text-secondary text-center'}>{t('deleteChallengeWarning')}</p>

        <div className={'grid grid-cols-[1fr_1fr] gap-4 w-full'}>
          <Button variant={'outline'} onClick={() => onClose()}>
            {t('cancel')}
          </Button>

          <Button onClick={() => handleDelete()} variant={'red'}>
            {t('delete')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ModalQuestionDeleteChallenge
