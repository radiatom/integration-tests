import { useQuery } from 'react-query'
import { PersonalTrainingApi } from '@/services/api/PersonalTrainingApiService'
import { TokenService } from '@/services/TokenService'
import { ROUTES } from '@/constants/routes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { usePopup } from '@/providers/PopupContext'

const usePersonalTraining = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setOpen, setPopupContent } = usePopup()

  return useQuery(
    ['personal-training'],
    async () => {
      const data = await Promise.all([
        PersonalTrainingApi.getPersonalTraining(),
        PersonalTrainingApi.getProgressPersonalTraining(),
      ])

      return { PersonalTraining: data[0], ProgressPersonalTraining: data[1] }
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
        return error?.message || 'personal training or progress data failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default usePersonalTraining
