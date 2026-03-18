import { useQuery } from 'react-query'
import { UserChallengeApi } from '@/services/api/UserChallengeApiService'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { usePopup } from '@/providers/PopupContext'

const useGetUserChallengeAvailable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setOpen, setPopupContent } = usePopup()

  return useQuery(
    ['user-challenge-available'],
    async () => {
      return await UserChallengeApi.getChallengeAvailable()
    },
    {
      onError: (error: any) => {
        setPopupContent({
          title: `${t('opps')}`,
          description: `${t('contactUsEmail')}`,
          buttonText: `${t('ok')}`,
          onButtonClick: () => {
            navigate(-1)
          },
        })
        setOpen(true)
        return error?.message || 'user challenge available data failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useGetUserChallengeAvailable
