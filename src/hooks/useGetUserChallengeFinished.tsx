import { useQuery } from 'react-query'
import { UserChallengeApi } from '@/services/api/UserChallengeApiService'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { usePopup } from '@/providers/PopupContext'
import { typeFinishedChallengesEnum } from '@/types/interfaces'

const useGetUserChallengeFinished = (type: typeFinishedChallengesEnum) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setOpen, setPopupContent } = usePopup()

  return useQuery(
    [`user-challenge-finished-${type}`],
    async () => {
      return await UserChallengeApi.getChallengeFinished(type)
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
        return error?.message || `user challenge finished type:${type} data failed`
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useGetUserChallengeFinished
