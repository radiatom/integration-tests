import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { usePopup } from '@/providers/PopupContext'
import { useTranslation } from 'react-i18next'
import { UserChallengeApi } from '@/services/api/UserChallengeApiService'
import { Challenge } from '@/types/interfaces'
import { ROUTES } from '@/constants/routes'

const useDeleteChallengeMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: Challenge) => void
  onError?: () => void
} = {}) => {
  const navigate = useNavigate()
  const { setOpen, setPopupContent } = usePopup()
  const { t } = useTranslation()

  return useMutation(
    async (id: string) => {
      return await UserChallengeApi.deleteChallenge(id)
    },
    {
      onSuccess: (data) => {
        if (onSuccess) {
          onSuccess(data)
        }
      },
      onError: (error: any) => {
        if (onError) onError()

        setPopupContent({
          title: `${t('opps')}`,
          description: `${t('contactUsEmail')}`,
          buttonText: `${t('ok')}`,
          onButtonClick: () => {
            navigate(ROUTES.CHALLENGES)
          },
        })
        setOpen(true)
        return error?.message || 'Failed delete challenge'
      },
      // retry: 2,
      // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useDeleteChallengeMutation
