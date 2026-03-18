import React from 'react'
import { useTranslation } from 'react-i18next'
import emptyLoader from '@/assets/images/svg/empty-loader-green.svg'

export const ResendCode = ({ onClick, isLoading }: { onClick: () => void; isLoading: boolean }) => {
  const { t } = useTranslation()
  return (
    <div className="flex items-center justify-center gap-4">
      <div>{t('didNotReceiveTheCode')}</div>
      {isLoading ? (
        <div className="mr-2 relative w-5 h-5">
          <img
            width={20}
            height={20}
            src={emptyLoader}
            alt="loader"
            className="animate-spin absolute top-2.5 left-2.5"
          />
        </div>
      ) : (
        <button type="button" onClick={onClick} className="font-semibold text-green3">
          {t('resendCode')}
        </button>
      )}
    </div>
  )
}
