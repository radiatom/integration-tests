import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { usePopup } from '@/providers/PopupContext'
import { useTranslation } from 'react-i18next'
import { UserChallengeApi } from '@/services/api/UserChallengeApiService'
import { Challenge } from '@/types/interfaces'

const useCompleteChallengeMutation = ({
  onSuccess,
}: { onSuccess?: (data: Challenge) => void } = {}) => {
  const navigate = useNavigate()
  const { setOpen, setPopupContent } = usePopup()
  const { t } = useTranslation()

  return useMutation(
    async (id: string) => {
      return await UserChallengeApi.postCompleteChallenge(id)
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
        return error?.message || 'complete challenge post failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useCompleteChallengeMutation
