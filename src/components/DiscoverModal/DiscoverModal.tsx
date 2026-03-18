import React, { FC } from 'react'
import { Button } from '@/components/Button/Button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import useGetUserChallengeAvailable from '@/hooks/useGetUserChallengeAvailable'

// interface
interface IDiscoverModalProps {
  withTitle?: boolean
  isEmpty: boolean
  onHome?: () => void
}

// component
const DiscoverModal: FC<Readonly<IDiscoverModalProps>> = ({ withTitle, isEmpty, onHome }) => {
  const { data: challenges } = useGetUserChallengeAvailable()
  const { t } = useTranslation()
  const navigation = useNavigate()

  // return
  return (
    <div
      className={
        'grid gap-4 fixed bottom-0 left-1/2 -translate-x-1/2 max-w-content w-full p-4 pb-5 bg-white rounded-[24px_24px_0_0] shadow-[0px_4px_44px_0px_#0000001A] '
      }
    >
      {withTitle && (
        <div className={'grid gap-[2px] text-center'}>
          <h3 className={'font-semibold text-xl4'}>{t('yourNextChallengeAwaits')}</h3>
          <p className={'text-secondary text-xl2'}>{t('readyToBuildNewHabits')}</p>
        </div>
      )}

      {isEmpty || challenges?.length === 0 ? (
        <>
          {onHome ? (
            <Button onClick={onHome}>{t('backHome')}</Button>
          ) : (
            <div
              className={
                'grid w-full h-[48px] text-center items-center rounded-full bg-[#00000008]'
              }
            >
              <p className={'text-center font-semibold text-[#B7BABE] uppercase'}>
                {t('newChallengesSoon')}
              </p>
            </div>
          )}
        </>
      ) : (
        <Button onClick={() => navigation(ROUTES.CHALLENGES + ROUTES.DISCOVER_CHALLENGES)}>
          {t('discoverNewChallenges')}
        </Button>
      )}
    </div>
  )
}

export default DiscoverModal
