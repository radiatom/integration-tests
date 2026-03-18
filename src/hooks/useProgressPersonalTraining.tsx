import { useQuery } from 'react-query'
import { PersonalTrainingApi } from '@/services/api/PersonalTrainingApiService'
import { TokenService } from '@/services/TokenService'
import { ROUTES } from '@/constants/routes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { usePopup } from '@/providers/PopupContext'

const useProgressPersonalTraining = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setOpen, setPopupContent } = usePopup()

  return useQuery(
    ['progress-personal-training'],
    async () => {
      return await PersonalTrainingApi.getProgressPersonalTraining()
    },
    {
      onError: (error: any) => {
        setPopupContent({
          title: `${t('opps')}`,
          description: `${t('contactUsEmail')}`,
          buttonText: `${t('ok')}`,
          onButtonClick: () => {
            TokenService.clearTokens()
            navigate(ROUTES.LOGIN)
          },
        })
        setOpen(true)
        return error?.message || 'progress personal training data failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useProgressPersonalTraining
