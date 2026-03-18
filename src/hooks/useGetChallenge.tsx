import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { usePopup } from '@/providers/PopupContext'
import { ROUTES } from '@/constants/routes'
import { UserChallengeApi } from '@/services/api/UserChallengeApiService'

const useGetChallenge = (id: string | undefined) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setOpen, setPopupContent } = usePopup()

  return useQuery(
    ['challenge', id],
    async () => {
      if (id) {
        return await UserChallengeApi.getChallenge(id)
      }
    },
    {
      onError: (error: any) => {
        setPopupContent({
          title: `${t('opps')}`,
          description: `${t('contactUsEmail')}`,
          buttonText: `${t('ok')}`,
          onButtonClick: () => {
            navigate(ROUTES.CHALLENGES)
          },
        })
        setOpen(true)
        return error?.message || 'Challenge data failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useGetChallenge
