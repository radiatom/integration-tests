import { BaseHttpServices, CustomAxiosRequestConfig } from '@/services/base-http-services'
import { trackErrors } from '@/helpers/facebookPixelEvents'
import {
  Challenge,
  MarkDayRequest,
  typeFinishedChallengesEnum,
  UserChallengeResponse,
  UserChallengesActiveResponse,
  UserChallengesAvailableResponse,
  UserChallengesFinishedResponse,
  UserChallengeStreaksResponse,
  UserChallengeTrophiesResponse,
} from '@/types/interfaces'
import { API_URL } from '@/constants/variables'
import { API_URLS } from '@/constants/api-urls'

interface UserChallengeApiInterface {
  getChallengeTrophies: () => Promise<UserChallengeTrophiesResponse>
  getChallengeStreaks: () => Promise<UserChallengeStreaksResponse>
  getChallengeActive: () => Promise<UserChallengesActiveResponse>
  getChallengeFinished: (
    type: typeFinishedChallengesEnum,
  ) => Promise<UserChallengesFinishedResponse>
  getChallengeAvailable: () => Promise<UserChallengesAvailableResponse>
  getChallenge: (id: string) => Promise<UserChallengeResponse>
  deleteChallenge: (id: string) => Promise<any>
  postAcceptChallenge: (id: string) => Promise<any>
  postMarkDay: (id: string, input: MarkDayRequest) => Promise<Challenge>
  postCompleteChallenge: (id: string) => Promise<Challenge>
  postRestartChallenge: (id: string) => Promise<Challenge>
}

export class UserChallengeApiService implements UserChallengeApiInterface {
  private readonly http: BaseHttpServices

  constructor(httpService: BaseHttpServices) {
    this.http = httpService
  }

  getChallengeTrophies = async (): Promise<UserChallengeTrophiesResponse> => {
    try {
      const response = await this.http.get(
        API_URLS.GET_USER_CHALLENGE_TROPHIES,
        {} as CustomAxiosRequestConfig<any>,
      )
      return response.data
    } catch (error) {
      trackErrors('challenge-trophies:api:fetch', error)
      throw error
    }
  }

  getChallengeStreaks = async (): Promise<UserChallengeStreaksResponse> => {
    try {
      const response = await this.http.get(
        API_URLS.GET_USER_CHALLENGE_STREAKS,
        {} as CustomAxiosRequestConfig<any>,
      )
      return response.data
    } catch (error) {
      trackErrors('challenge-streaks:api:fetch', error)
      throw error
    }
  }

  getChallengeActive = async (): Promise<UserChallengesActiveResponse> => {
    try {
      const response = await this.http.get(
        API_URLS.GET_USER_CHALLENGE_ACTIVE,
        {} as CustomAxiosRequestConfig<any>,
      )
      return response.data
    } catch (error) {
      trackErrors('challenge-active:api:fetch', error)
      throw error
    }
  }

  getChallengeFinished = async (
    type: typeFinishedChallengesEnum,
  ): Promise<UserChallengesFinishedResponse> => {
    try {
      const response = await this.http.get(
        `${API_URLS.GET_USER_CHALLENGE_FINISHED}?type=${type}`,
        {} as CustomAxiosRequestConfig<any>,
      )
      return response.data
    } catch (error) {
      trackErrors(`challenge-finished-${type}:api:fetch`, error)
      throw error
    }
  }

  getChallengeAvailable = async (): Promise<UserChallengesAvailableResponse> => {
    try {
      const response = await this.http.get(
        API_URLS.GET_USER_CHALLENGE_AVAILABLE,
        {} as CustomAxiosRequestConfig<any>,
      )
      return response.data
    } catch (error) {
      trackErrors('challenge-available:api:fetch', error)
      throw error
    }
  }

  getChallenge = async (id: string): Promise<UserChallengeResponse> => {
    try {
      const response = await this.http.get(
        `${API_URLS.GET_USER_CHALLENGE}/${id}`,
        {} as CustomAxiosRequestConfig<any>,
      )

      return response.data
    } catch (error) {
      trackErrors('challenge:api:fetch', error)
      throw error
    }
  }

  postAcceptChallenge = async (id: string): Promise<any> => {
    try {
      const response = await this.http.post(
        API_URLS.GET_USER_CHALLENGE,
        { challengeId: id },
        {} as CustomAxiosRequestConfig<any>,
      )

      return response.data
    } catch (error) {
      trackErrors('postAcceptChallenge:api:fetch', error)
      throw error
    }
  }

  postMarkDay = async (id: string, input: MarkDayRequest): Promise<Challenge> => {
    try {
      const response = await this.http.post(
        `${API_URLS.GET_USER_CHALLENGE}/${id}/days`,
        input,
        {} as CustomAxiosRequestConfig<any>,
      )

      return response.data
    } catch (error) {
      trackErrors('postMarkDay:api:fetch', error)
      throw error
    }
  }

  postCompleteChallenge = async (id: string): Promise<Challenge> => {
    try {
      const response = await this.http.post(
        `${API_URLS.GET_USER_CHALLENGE}/${id}/complete`,
        {} as CustomAxiosRequestConfig<any>,
      )

      return response.data
    } catch (error) {
      trackErrors('postCompleteChallenge:api:fetch', error)
      throw error
    }
  }

  postRestartChallenge = async (id: string): Promise<Challenge> => {
    try {
      const response = await this.http.post(
        `${API_URLS.GET_USER_CHALLENGE}/${id}/restart`,
        {} as CustomAxiosRequestConfig<any>,
      )

      return response.data
    } catch (error) {
      trackErrors('postRestartChallenge:api:fetch', error)
      throw error
    }
  }

  deleteChallenge = async (id: string): Promise<any> => {
    try {
      const response = await this.http.delete(
        `${API_URLS.GET_USER_CHALLENGE}/${id}`,
        {} as CustomAxiosRequestConfig<any>,
      )

      return response.data
    } catch (error) {
      trackErrors('deleteChallenge:api:fetch', error)
      throw error
    }
  }
}

export const UserChallengeApi = new UserChallengeApiService(new BaseHttpServices(API_URL))
