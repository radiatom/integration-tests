import { useQuery } from 'react-query'
import { WorkoutsApi } from '@/services/api/WorkoutsApiService'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { usePopup } from '@/providers/PopupContext'
import { ROUTES } from '@/constants/routes'

const useWorkout = (id: string | undefined, globalLoader: boolean) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setOpen, setPopupContent } = usePopup()

  return useQuery(
    ['workout', id],
    async () => {
      if (id) {
        return await WorkoutsApi.getWorkout(id)
      }
    },
    {
      meta: {
        globalLoader,
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
        return error?.message || 'Workout data failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useWorkout
