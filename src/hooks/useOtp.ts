import { useMutation } from 'react-query'
import { AuthApi } from '@/services/api/AuthApiService'
import { useNavigate } from 'react-router-dom'
import { UserFormInput } from '@/types/interfaces'
import { ROUTES } from '@/constants/routes'
import { toast } from 'sonner'

const useOtp = () => {
  const navigate = useNavigate()

  return useMutation(
    async (userData: UserFormInput) => {
      return await AuthApi.getOtpCodeByEmail(userData)
    },
    {
      onSuccess: (_data, variables) => {
        try {
          sessionStorage.setItem('otp-email', variables.email)
          navigate(ROUTES.OTP)
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : 'Failed otp request')
        }
      },
      onError: (error: any) => {
        toast.error('Failed otp request')
        return error?.message || 'Failed otp request'
      },
    },
  )
}

export default useOtp
