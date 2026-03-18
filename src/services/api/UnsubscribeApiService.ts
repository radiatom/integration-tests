import { BaseHttpServices } from '@/services/base-http-services'
import { API_URL } from '@/constants/variables'
import { API_URLS } from '@/constants/api-urls'

interface UnsubscribeResponse {
  status: number
  body: any
}

interface UnsubscribeApiInterface {
  unsubscribePayment: (
    paymentPlatform: string,
    subscriptionId: string,
  ) => Promise<UnsubscribeResponse>
}

export class UnsubscribeApiService implements UnsubscribeApiInterface {
  private readonly http: BaseHttpServices

  constructor(httpService: BaseHttpServices) {
    this.http = httpService
  }

  unsubscribePayment = async (paymentPlatform: string): Promise<UnsubscribeResponse> => {
    try {
      const urlUnsubscribe =
        paymentPlatform === 'primer-meal'
          ? API_URLS.UNSUBSCRIBE_MEALS
          : API_URLS.UNSUBSCRIBE_HUBSPOT

      const response = await this.http.put(urlUnsubscribe, { paymentPlatform }, {})

      return {
        status: response.status,
        body: response.data,
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Unsubscribe failed')
    }
  }
}

export const UnsubscribeApi = new UnsubscribeApiService(new BaseHttpServices(API_URL))
