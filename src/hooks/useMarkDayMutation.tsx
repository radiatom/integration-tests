import { useMutation } from 'react-query'
import { usePopup } from '@/providers/PopupContext'
import { useTranslation } from 'react-i18next'
import { UserChallengeApi } from '@/services/api/UserChallengeApiService'
import { Challenge } from '@/types/interfaces'

const useMarkDayMutation = ({ onSuccess }: { onSuccess?: (data: Challenge) => void } = {}) => {
  const { setOpen, setPopupContent } = usePopup()
  const { t } = useTranslation()

  return useMutation(
    async ({
      id,
      dayNumber,
      isCompleted,
    }: {
      id: string
      dayNumber: number
      isCompleted: boolean
    }) => {
      return await UserChallengeApi.postMarkDay(id, { day: dayNumber, completed: isCompleted })
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
        return error?.message || 'mark day post failed'
      },
      // retry: 2,
      // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useMarkDayMutation
