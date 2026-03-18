import React from 'react'
import { Button } from '@/components/Button/Button'
import { useTranslation } from 'react-i18next'
import { IconBlock } from '@/components/IconBlock/IconBlock'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

import crossIcon from '@/assets/images/svg/cross-circle.svg'

export const CanceledSubscription = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { search } = useLocation()
  const endDate = new URLSearchParams(search).get('endDate') as string

  return (
    <div className="h-full -mt-10">
      <div className="text-center flex flex-col items-center justify-center h-full gap-2">
        <IconBlock icon={crossIcon} alt="cross" />
        <div className="text-xl4m font-[550] tracking-[-0.3px]">{t('weCanceled')}</div>
        <p className="text-secondary">{`${t('yourSubscriptionIsCanceled')} ${endDate ?? ''}.`}</p>
      </div>

      <div className="fixed bottom-0 left-1/2 right-0 p-4 pt-0 w-full max-w-image -translate-x-1/2">
        <Button onClick={() => navigate(ROUTES.PROFILE, { replace: true })}>{t('gotIt')}</Button>
      </div>
    </div>
  )
}
