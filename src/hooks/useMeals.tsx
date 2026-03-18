import { useQueries } from 'react-query'
import { MealsApi } from '@/services/api/MealsApiService'
import { usePopup } from '@/providers/PopupContext'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const useMeals = (ids: string[] | undefined, globalLoader: boolean) => {
  const { setOpen, setPopupContent } = usePopup()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const updateIds = ids || []

  const queries = updateIds.map((id) => ({
    queryKey: ['meal', id],

    queryFn: async () => {
      return await MealsApi.getMeal(id)
    },
    meta: {
      globalLoader,
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
      return error?.message || `Meal data failed for ID: ${id}`
    },
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!id && updateIds.length > 0,
  }))

  return useQueries(queries)
}

export default useMeals
