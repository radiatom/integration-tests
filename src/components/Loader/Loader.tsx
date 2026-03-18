import React from 'react'
import loaderSvg from '@/assets/images/svg/loader.svg'
import { useTranslation } from 'react-i18next'

// component
export const Loader = () => {
  const { t } = useTranslation()

  // return
  return (
    <div className="flex justify-center items-center ">
      <div className={'translate-x-1/2 translate-y-1/2'}>
        <img src={loaderSvg} alt={t('loader')} className="animate-spin h-5 w-5 text-white" />
      </div>
    </div>
  )
}
