import { useMutation } from 'react-query'
import { AuthApi } from '@/services/api/AuthApiService'
import { useNavigate } from 'react-router-dom'
import { UserSignIn } from '@/types/interfaces'
import { ROUTES } from '@/constants/routes'

const useSignIn = ({ onCustomError }: { onCustomError: () => void }) => {
  const navigate = useNavigate()

  return useMutation(
    async (userData: UserSignIn) => {
      return await AuthApi.signIn(userData)
    },
    {
      onSuccess: async (res) => {
        try {
          const { refreshToken } = res.body.result

          await AuthApi.autoAuth(refreshToken)

          navigate(ROUTES.PLAN, { replace: true })
        } catch (error: any) {
          throw new Error(error.message || 'Authentication failed')
        }
      },
      onError: (error: any) => {
        onCustomError()
        return error?.message || 'Authentication failed'
      },
    },
  )
}

export default useSignIn
