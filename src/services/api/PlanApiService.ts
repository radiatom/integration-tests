import { BaseHttpServices, CustomAxiosRequestConfig } from '@/services/base-http-services'
import { trackErrors } from '@/helpers/facebookPixelEvents'
import { WorkoutGroupsResponse } from '@/types/interfaces'
import { API_URL } from '@/constants/variables'
import { API_URLS } from '@/constants/api-urls'

interface PlanApiInterface {
  getPlans: () => Promise<WorkoutGroupsResponse>
  // getWorkout: (id: string) => Promise<any>
}

export class PlanApiService implements PlanApiInterface {
  private readonly http: BaseHttpServices

  constructor(httpService: BaseHttpServices) {
    this.http = httpService
  }

  getPlans = async (): Promise<WorkoutGroupsResponse> => {
    try {
      const response = await this.http.get(API_URLS.GET_PLANS, {} as CustomAxiosRequestConfig<any>)
      // return response.data.page
      return response.data
    } catch (error) {
      trackErrors('plans:api:fetch', error)
      throw error
    }
  }

  // getWorkout = async (id: string): Promise<{ page: WorkoutData }> => {
  //   try {
  //     const response = await this.http.get(`${API_URLS.GET_WORKOUT}${id}`, {
  //       params: {
  //         isPopulate: true,
  //       },
  //     } as CustomAxiosRequestConfig<any>)
  //
  //     return response.data
  //   } catch (error) {
  //     trackErrors('workout:api:fetch', error)
  //     throw error
  //   }
  // }
}

export const PlanApi = new PlanApiService(new BaseHttpServices(API_URL))
