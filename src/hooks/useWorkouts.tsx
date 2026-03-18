import { useQueries } from 'react-query'
import { WorkoutsApi } from '@/services/api/WorkoutsApiService'
import { ROUTES } from '@/constants/routes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { usePopup } from '@/providers/PopupContext'

const useWorkouts = (ids: string[] | undefined) => {
  const updateIds = ids || []
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setOpen, setPopupContent } = usePopup()

  const queries = updateIds.map((id) => ({
    queryKey: ['workout', id],

    queryFn: async () => {
      return await WorkoutsApi.getWorkout(id)
    },

    onError: (error: any) => {
      setPopupContent({
        title: `${t('opps')}`,
        description: `${t('contactUsEmail')}`,
        buttonText: `${t('ok')}`,
        onButtonClick: () => {
          navigate(ROUTES.PLAN)
        },
      })
      setOpen(true)
      return error?.message || `Workout data failed for ID: ${id}`
    },
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!id && updateIds.length > 0,
  }))

  return useQueries(queries)
}

export default useWorkouts
