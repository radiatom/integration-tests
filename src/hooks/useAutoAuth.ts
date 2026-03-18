import { useQuery } from 'react-query'
import { AuthApi } from '@/services/api/AuthApiService'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const useAutoAuth = (refreshToken: string) => {
  const navigate = useNavigate()

  return useQuery(
    ['autoAuth'],
    async () => {
      if (!refreshToken) {
        throw new Error('No user token provided')
      }

      return await AuthApi.autoAuth(refreshToken)
    },
    {
      enabled: !!refreshToken,
      onSuccess: () => {
        navigate(ROUTES.PLAN, { replace: true })
      },
      onError: (error: any) => {
        return error?.message || 'Authentication failed'
      },
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  )
}

export default useAutoAuth
