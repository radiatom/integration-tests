import { BaseHttpServices, CustomAxiosRequestConfig } from '@/services/base-http-services'
import { trackErrors } from '@/helpers/facebookPixelEvents'
import { PersonalTrainingResponse, ProgressTraining } from '@/types/interfaces'
import { API_URL } from '@/constants/variables'
import { API_URLS } from '@/constants/api-urls'

interface PersonalTrainingApiInterface {
  getPersonalTraining: () => Promise<PersonalTrainingResponse>
  getProgressPersonalTraining: () => Promise<ProgressTraining>
  patchProgressPersonalTraining: (
    lastCompletedTrainingDate: string,
    trainingIndex: number,
  ) => Promise<any>
  patchPersonalTraining: (personalTrainingPlanId: string) => Promise<any>
}

export class PersonalTrainingApiService implements PersonalTrainingApiInterface {
  private readonly http: BaseHttpServices

  constructor(httpService: BaseHttpServices) {
    this.http = httpService
  }

  getPersonalTraining = async (): Promise<PersonalTrainingResponse> => {
    try {
      const response = await this.http.get(
        API_URLS.GET_PERSONAL_TRAINING,
        {} as CustomAxiosRequestConfig<any>,
      )
      return response.data.page
    } catch (error) {
      trackErrors('personal-training:api:fetch', error)
      throw error
    }
  }

  getProgressPersonalTraining = async (): Promise<ProgressTraining> => {
    try {
      const response = await this.http.get(
        API_URLS.GET_PROGRESS_PERSONAL_TRAINING,
        {} as CustomAxiosRequestConfig<any>,
      )
      return response.data
    } catch (error) {
      trackErrors('progress-personal-training:api:fetch', error)
      throw error
    }
  }

  patchProgressPersonalTraining = async (
    lastCompletedTrainingDate: string,
    trainingIndex: number,
  ): Promise<any> => {
    try {
      const response = await this.http.patch(API_URLS.PATCH_PROGRESS_PERSONAL_TRAINING, {
        lastCompletedTrainingDate,
        trainingIndex,
      } as CustomAxiosRequestConfig<any>)
      return response.data
    } catch (error) {
      trackErrors('progress-personal-training:api:fetch', error)
      throw error
    }
  }

  patchPersonalTraining = async (personalTrainingPlanId: string): Promise<any> => {
    try {
      const response = await this.http.patch(
        `${API_URLS.PATCH_PERSONAL_TRAINING}/${personalTrainingPlanId}`,
      )
      return response.data
    } catch (error) {
      trackErrors('personal-training:api:fetch', error)
      throw error
    }
  }
}

export const PersonalTrainingApi = new PersonalTrainingApiService(new BaseHttpServices(API_URL))
