import { useMutation } from 'react-query'
import { PersonalTrainingApi } from '@/services/api/PersonalTrainingApiService'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { usePopup } from '@/providers/PopupContext'
import { useTranslation } from 'react-i18next'

const usePatchProgressPersonalTrainingMutation = ({
  onSuccess,
}: { onSuccess?: (data: any) => void } = {}) => {
  const now = new Date()
  const lastCompletedTrainingDate = now.toISOString()
  const navigate = useNavigate()
  const { setOpen, setPopupContent } = usePopup()
  const { t } = useTranslation()

  return useMutation(
    async (trainingIndex: string | null) => {
      localStorage.removeItem('trainingIndex')
      return await PersonalTrainingApi.patchProgressPersonalTraining(
        lastCompletedTrainingDate,
        Number(trainingIndex),
      )
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
        return error?.message || 'patch progress personal training data failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default usePatchProgressPersonalTrainingMutation
