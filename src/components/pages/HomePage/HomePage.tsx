import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useAutoAuth from '@/hooks/useAutoAuth'
import { ROUTES } from '@/constants/routes'
import { toast } from 'sonner'

import warningIcon from '@/assets/images/svg/warn.svg'
import crossIcon from '@/assets/images/svg/cross.svg'

export const HomePage = () => {
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()
  const userToken = searchParams.get('token')
  const navigate = useNavigate()

  const { isLoading, error } = useAutoAuth(userToken as string)

  useEffect(() => {
    if (!userToken || error) {
      navigate(ROUTES.LOGIN)
    }
  }, [userToken, error])

  if (isLoading) {
    return (
      <div className="fixed top-0 z-30 left-0 bg-white w-full h-[calc(100%-60px)]">
        <div className="spinner z-30"></div>
      </div>
    )
  }

  if (error) {
    toast.custom(
      (id) => (
        <div className="flex items-center gap-3 w-full bg-white px-3 py-2 rounded-2xl shadow">
          <div className="rounded-r10 bg-[#FF3B30] p-2 shrink-0 flex items-center justify-center">
            <img src={warningIcon} alt="warning" width={20} height={20} />
          </div>
          <div className="font-outfit font-normal grow">
            <p className="text-[#FF3B30] leading-[140%]">{t('invalidEmailOrPassword')}</p>
            <p className="text-[14px] text-secondary leading-[160%]">{t('doubleCheckAndRetry')}</p>
          </div>
          <button
            onClick={() => toast.dismiss(id)}
            className="w-8 h-8 shrink-0 flex items-center justify-center"
          >
            <img src={crossIcon} alt="cross icon" width={16} height={16} />
          </button>
        </div>
      ),
      {
        duration: 5000,
      },
    )
  }

  return <></>
}
