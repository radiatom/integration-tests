import { useMutation } from 'react-query'
import { AuthApi } from '@/services/api/AuthApiService'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { usePopup } from '@/providers/PopupContext'
import { useTranslation } from 'react-i18next'

const useDeleteUser = () => {
  const navigate = useNavigate()
  const { setOpen, setPopupContent } = usePopup()
  const { t } = useTranslation()

  return useMutation(
    async (id: string) => {
      return await AuthApi.deleteUser(id)
    },
    {
      onSuccess: () => {
        try {
          navigate(ROUTES.LOGIN)
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : 'Failed delete user')
        }
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
        return error?.message || 'Failed delete user'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useDeleteUser
