import { useQuery } from 'react-query'
import { MealsApi } from '@/services/api/MealsApiService'
import { usePopup } from '@/providers/PopupContext'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const useMealsDays = () => {
  const { setOpen, setPopupContent } = usePopup()
  const { t } = useTranslation()
  const navigate = useNavigate()

  return useQuery(
    ['meals-days'],
    async () => {
      return await MealsApi.getMealsDays()
    },
    {
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
        return error?.message || 'Meals days data failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useMealsDays
