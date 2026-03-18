import { useQuery } from 'react-query'
import { WorkoutsApi } from '@/services/api/WorkoutsApiService'
import { usePopup } from '@/providers/PopupContext'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const useWorkoutsGroups = () => {
  const { setOpen, setPopupContent } = usePopup()
  const { t } = useTranslation()
  const navigate = useNavigate()

  return useQuery(
    ['workouts-groups'],
    async () => {
      return await WorkoutsApi.getWorkoutsGroups()
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
        return error?.message || 'Workouts data failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useWorkoutsGroups
