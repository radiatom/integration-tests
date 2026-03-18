import { useMutation } from 'react-query'
import { UnsubscribeParams } from '@/types/interfaces'
import { UnsubscribeApi } from '@/services/api/UnsubscribeApiService'

const useUnsubscribe = () => {
  return useMutation(
    async ({ paymentPlatform }: UnsubscribeParams) => {
      return await UnsubscribeApi.unsubscribePayment(paymentPlatform)
    },
    {
      onSuccess: (res) => {
        if (res.status !== 200) {
          throw new Error(res.body?.message || 'Unsubscribe failed')
        }
      },
      onError: (error: any) => {
        return error?.message || 'Unsubscribe failed'
      },
    },
  )
}

export default useUnsubscribe
