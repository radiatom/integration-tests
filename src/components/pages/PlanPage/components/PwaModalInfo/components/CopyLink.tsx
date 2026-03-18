/* eslint-disable no-console */

import React, { useState } from 'react'
import { WEB_APP_LINK } from '@/constants/variables'
import copyIcon from '@/assets/images/svg/copy.svg'
import { useTranslation } from 'react-i18next'

export const CopyLink = ({ index }: { index: number }) => {
  const [isCopied, setIsCopied] = useState(false)
  const { t } = useTranslation()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WEB_APP_LINK)
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, 3000)
    } catch (e) {
      console.error('Copy failed', e)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-full bg-[#E9F9F0] flex items-center justify-center shrink-0">
        {index}
      </div>

      <div className="text-md flex items-center flex-wrap gap-1.5">
        <span className="whitespace-nowrap"> {t('goToDefaultBrowser')}</span>
        <div className="relative flex items-center gap-1.5">
          <span className="text-[#1BB35F]">{WEB_APP_LINK}</span>
          <button onClick={handleCopy}>
            <img src={copyIcon} alt="copy-icon" className="w-6 h-6" />
          </button>
          <div
            className={`absolute -top-10 right-0 bg-[#D0FFDC] px-3 py-2 rounded-lg transition-all duration-300 ${
              isCopied
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible pointer-events-none translate-y-2'
            }`}
          >
            <p className="text-xs whitespace-nowrap">{t('copied')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
