import { useMutation } from 'react-query'
import { AuthApi } from '@/services/api/AuthApiService'
import { Forgot } from '@/types/interfaces'

const useForgot = (onSuccess: () => void) => {
  return useMutation(
    async (user: Forgot) => {
      return await AuthApi.forgot(user)
    },
    {
      onSuccess: (res) => {
        if (res.status === 200 && res.body?.message === 'Request was sent to email') {
          try {
            onSuccess()
            return res.body
          } catch (error: any) {
            throw new Error(error.message || 'Forgot failed')
          }
        } else {
          throw new Error(res.body?.message || 'Forgot failed')
        }
      },
      onError: (error: any) => {
        return error?.message || 'Forgot failed'
      },
    },
  )
}

export default useForgot
