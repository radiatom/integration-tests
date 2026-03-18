import React from 'react'
import Lottie from 'lottie-react'
import lottieLoader from '@/assets/lottie/loader.json'
import { useTranslation } from 'react-i18next'

export const FeedbackLoader = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-2">
      <div>
        <Lottie className="w-[128px] h-[128px]" animationData={lottieLoader} />
      </div>
      <p className="text-xl4m tracking-[-0.03px] font-[550]">{t('yourFeedbackMatters')}</p>
      {/* <p className="text-secondary">{t('specialOffer')}</p> */}
    </div>
  )
}
