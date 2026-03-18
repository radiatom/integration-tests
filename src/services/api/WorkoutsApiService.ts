import { BaseHttpServices, CustomAxiosRequestConfig } from '@/services/base-http-services'
import { trackErrors } from '@/helpers/facebookPixelEvents'
import { WorkoutData, WorkoutsGroupsData } from '@/types/interfaces'
import { API_URL } from '@/constants/variables'
import { API_URLS } from '@/constants/api-urls'

interface WorkoutsApiInterface {
  getWorkoutsGroups: () => Promise<WorkoutsGroupsData[]>
  getWorkout: (id: string) => Promise<any>
}

export class WorkoutsApiService implements WorkoutsApiInterface {
  private readonly http: BaseHttpServices

  constructor(httpService: BaseHttpServices) {
    this.http = httpService
  }

  getWorkoutsGroups = async (): Promise<WorkoutsGroupsData[]> => {
    try {
      const response = await this.http.get(
        API_URLS.GET_WORKOUTS_GROUPS,
        {} as CustomAxiosRequestConfig<any>,
      )
      return response.data.page
    } catch (error) {
      trackErrors('workouts-groups:api:fetch', error)
      throw error
    }
  }

  getWorkout = async (id: string): Promise<{ page: WorkoutData }> => {
    try {
      const response = await this.http.get(`${API_URLS.GET_WORKOUT}${id}`, {
        params: {
          isPopulate: true,
        },
      } as CustomAxiosRequestConfig<any>)

      return response.data
    } catch (error) {
      trackErrors('workout:api:fetch', error)
      throw error
    }
  }
}

export const WorkoutsApi = new WorkoutsApiService(new BaseHttpServices(API_URL))
