import React, { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import Fireworks from '@/components/Fireworks/Fireworks'
import AssistantSvg from '@/assets/images/svg/avatar-assistant.svg'
import { Loader } from '@/components/Loader/Loader'
import { ROUTES } from '@/constants/routes'
import FloatingStars from '@/components/FloatingStars/FloatingStars'

// interface
export interface IModalProps {
  isFireworks?: boolean
  children: ReactNode
  comment: string
}

// component
const CongratulationsChallenge: FC<Readonly<IModalProps>> = ({
  isFireworks,
  children,
  comment,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const isLoading = false

  // return
  return (
    <div
      className={
        'grid items-end justify-items-center fixed top-0 left-0 w-full min-h-full p-4 z-40'
      }
      id={'EndChallenge'}
    >
      {isFireworks ? <Fireworks /> : <FloatingStars />}

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
              {comment}

              <div
                className="absolute bottom-[99%] right-[30px] w-[13px] h-[13px] bg-white"
                style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
              />
            </p>
          </div>

          <div
            className={
              'grid gap-4 max-w-content rounded-[40px] bg-white shadow-lg overflow-hidden p-6 pt-8 z-10'
            }
          >
            {children}

            <Button
              onClick={() => {
                navigate(ROUTES.CHALLENGES)
              }}
            >
              {t('continueMyJourney')}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default CongratulationsChallenge
