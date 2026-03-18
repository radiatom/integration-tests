import { BaseHttpServices, CustomAxiosRequestConfig } from '@/services/base-http-services'
import { trackErrors } from '@/helpers/facebookPixelEvents'
import { MealsDaysData, RecipeData } from '@/types/interfaces'
import { API_URL } from '@/constants/variables'
import { API_URLS } from '@/constants/api-urls'

interface MealsApiInterface {
  getMealsDays: () => Promise<MealsDaysData>
  // getMeals: (id: string) => Promise<any>
}

export class MealsApiService implements MealsApiInterface {
  private readonly http: BaseHttpServices

  constructor(httpService: BaseHttpServices) {
    this.http = httpService
  }

  getMealsDays = async (): Promise<MealsDaysData> => {
    try {
      const response = await this.http.get(
        API_URLS.GET_MEALS_DAYS,
        {} as CustomAxiosRequestConfig<any>,
      )

      return response.data.page
    } catch (error) {
      trackErrors('meals-days:api:fetch', error)
      throw error
    }
  }

  getMeal = async (id: string): Promise<{ page: RecipeData }> => {
    try {
      const response = await this.http.get(`${API_URLS.GET_MEAL}${id}`, {
        params: {
          isPopulate: true,
        },
      } as CustomAxiosRequestConfig<any>)

      return response.data
    } catch (error) {
      trackErrors('meal:api:fetch', error)
      throw error
    }
  }
}

export const MealsApi = new MealsApiService(new BaseHttpServices(API_URL))
