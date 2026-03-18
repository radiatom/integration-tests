import { useMutation } from 'react-query'
import { PersonalTrainingApi } from '@/services/api/PersonalTrainingApiService'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useTranslation } from 'react-i18next'
import { usePopup } from '@/providers/PopupContext'

const useProgressPersonalTraining = ({ onSuccess }: { onSuccess?: (data: any) => void } = {}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { setOpen, setPopupContent } = usePopup()

  return useMutation(
    async (personalTrainingPlanId: string) => {
      return await PersonalTrainingApi.patchPersonalTraining(personalTrainingPlanId)
    },
    {
      onSuccess: (data) => {
        if (onSuccess) onSuccess(data)

        navigate(ROUTES.PLAN)
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
        return error?.message || 'patch personal training data failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useProgressPersonalTraining
