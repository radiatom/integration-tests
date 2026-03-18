import React from 'react'
import { Button } from '@/components/Button/Button'
import { useTranslation } from 'react-i18next'
import walletIcon from '@/assets/images/svg/wallet.svg'
import plusIcon from '@/assets/images/svg/plus.svg'
import { IconBlock } from '@/components/IconBlock/IconBlock'

export const NotPayments = () => {
  const { t } = useTranslation()
  return (
    <div className="px-4 mt-6">
      <div className="text-center space-y-2">
        <IconBlock icon={walletIcon} alt="Wallet" />
        <div className="text-xl4m font-[550] tracking-[-0.3px]">{t('noPaymentTitle')}</div>
        <p className="text-secondary">{t('noPaymentDescription')}</p>
      </div>

      <div className="fixed bottom-0 left-1/2 right-0 p-4 pt-0 w-full max-w-image -translate-x-1/2">
        <Button className="opacity-0 pointer-events-none">
          <img src={plusIcon} alt="plus-icon" width={24} height={24} className="w-6 h-6 mr-2" />
          {t('addPaymentMethod')}
        </Button>
      </div>
    </div>
  )
}
