import { useQuery } from 'react-query'
import { MealsApi } from '@/services/api/MealsApiService'
import { usePopup } from '@/providers/PopupContext'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const useMeal = (id: string | undefined) => {
  const { setOpen, setPopupContent } = usePopup()
  const { t } = useTranslation()
  const navigate = useNavigate()

  return useQuery(
    ['meal', id],
    async () => {
      if (id) {
        return await MealsApi.getMeal(id)
      }
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
        return error?.message || 'Meal data failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useMeal
