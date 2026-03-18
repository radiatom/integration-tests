import React from 'react'
import { IconBlock } from '@/components/IconBlock/IconBlock'
import discountLogo from '@/assets/images/svg/discount.svg'
import { Button } from '@/components/Button/Button'
import { useTranslation } from 'react-i18next'
import yesLogo from '@/assets/images/svg/yes.svg'

export const KeepPremium = () => {
  const { t } = useTranslation()
  const PROS_LIST = [t('prosList.analyzed'), t('prosList.noChange'), t('prosList.after')]
  return (
    <div>
      <div>
        <div className="space-y-2 text-center">
          <IconBlock icon={discountLogo} alt="Savings" />
          <p className="text-secondary text-base">{t('limitedDeal')}</p>
          <h1 className="text-xl4m tracking-[-0.03px] font-[550] max-w-[330px] mx-auto">
            {t('offerSavings')}
          </h1>
        </div>

        <p className="mt-6 text-xl font-[550]">{t('keepWellness')}</p>

        <p className="mt-3 text-xs font-[450] text-secondary">{t('dontMissChance')}</p>

        <ul className="mt-4 space-y-3">
          {PROS_LIST.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <img src={yesLogo} alt="yes" width={20} height={20} />
              <span className="text-xs font-[450]">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-[50px]">
          <Button>{t('keepPremium')}</Button>

          <button className="text-[#9EA1AD] inline-block w-full font-medium leading-[140%] py-6 text-center">
            {t('cancelSubscriptionBtn')}
          </button>
        </div>

        <p className="text-[11px] text-secondary mt-2.5 leading-[140%]">{t('footerText')}</p>
      </div>
    </div>
  )
}
