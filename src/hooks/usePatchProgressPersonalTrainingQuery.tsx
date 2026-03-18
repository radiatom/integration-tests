import { useQuery } from 'react-query'
import { PersonalTrainingApi } from '@/services/api/PersonalTrainingApiService'
import { usePopup } from '@/providers/PopupContext'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const usePatchProgressPersonalTrainingQuery = (trainingIndex: string | null) => {
  const now = new Date()
  const lastCompletedTrainingDate = now.toISOString()
  const { setOpen, setPopupContent } = usePopup()
  const { t } = useTranslation()
  const navigate = useNavigate()

  return useQuery(
    ['patch-progress-personal-training'],
    async () => {
      localStorage.removeItem('trainingIndex')
      return await PersonalTrainingApi.patchProgressPersonalTraining(
        lastCompletedTrainingDate,
        Number(trainingIndex),
      )
    },
    {
      enabled: !!trainingIndex,
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

export default usePatchProgressPersonalTrainingQuery
