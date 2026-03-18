import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { usePopup } from '@/providers/PopupContext'
import { useTranslation } from 'react-i18next'
import { UserChallengeApi } from '@/services/api/UserChallengeApiService'

const useAcceptChallengeMutation = ({ onSuccess }: { onSuccess?: (data: any) => void } = {}) => {
  const navigate = useNavigate()
  const { setOpen, setPopupContent } = usePopup()

  const { t } = useTranslation()

  return useMutation(
    async (id: string) => {
      return await UserChallengeApi.postAcceptChallenge(id)
    },
    {
      onSuccess: (data) => {
        if (onSuccess) onSuccess(data)
      },
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
        return error?.message || 'accept challenge post failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useAcceptChallengeMutation
