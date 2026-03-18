import { useMutation } from 'react-query'
import { usePopup } from '@/providers/PopupContext'
import { useTranslation } from 'react-i18next'
import { UserChallengeApi } from '@/services/api/UserChallengeApiService'
import { Challenge } from '@/types/interfaces'

const useRestartChallengeMutation = ({
  onSuccess,
}: { onSuccess?: (data: Challenge) => void } = {}) => {
  const { setOpen, setPopupContent } = usePopup()
  const { t } = useTranslation()

  return useMutation(
    async (id: string) => {
      return await UserChallengeApi.postRestartChallenge(id)
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
            setOpen(false)
          },
        })
        setOpen(true)
        return error?.message || 'restart challenge post failed'
      },
      // retry: 2,
      // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useRestartChallengeMutation
