import { useQuery } from 'react-query'
import { ProfileApi } from '@/services/api/ProfileApiService'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { usePopup } from '@/providers/PopupContext'
import { TokenService } from '@/services/TokenService'
import { ROUTES } from '@/constants/routes'

const useProfile = (skip?: boolean) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setOpen, setPopupContent } = usePopup()

  return useQuery(
    ['profile'],
    async () => {
      return await ProfileApi.getProfile()
    },
    {
      enabled: !skip,
      onError: (error: any) => {
        setPopupContent({
          title: `${t('opps')}`,
          description: `${t('contactUsEmail')}`,
          buttonText: `${t('ok')}`,
          onButtonClick: () => {
            TokenService.clearTokens()
            navigate(ROUTES.LOGIN)
          },
        })
        setOpen(true)
        return error?.message || 'Profile data failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useProfile
