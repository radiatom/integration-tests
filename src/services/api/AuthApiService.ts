import { BaseHttpServices, CustomAxiosRequestConfig } from '@/services/base-http-services'
import { trackErrors } from '@/helpers/facebookPixelEvents'
import { API_URL, PUBLIC_URL } from '@/constants/variables'
import {
  Forgot,
  GetOtpCodeResponse,
  SignInResponse,
  typeAccessEnum,
  UserAccountResponse,
  UserFormInput,
  UserSignIn,
} from '@/types/interfaces'
import { TokenService } from '@/services/TokenService'
import { API_URLS } from '@/constants/api-urls'
import { ROUTES } from '@/constants/routes'

interface UpdateTokenRequest {
  refreshToken: string
}

interface AuthApiInterface {
  autoAuth: (userToken: string) => Promise<{ userId: string; email: string }>
}

export class AuthApiService implements AuthApiInterface {
  private readonly http: BaseHttpServices

  constructor(httpService: BaseHttpServices) {
    this.http = httpService
  }

  signIn = async (user: UserSignIn): Promise<SignInResponse> => {
    try {
      const response = await this.http.put(
        API_URLS.VERIFY_OTP_AUTH,
        { ...user, destination: 'AUTH_UNSUBSCRIBE' },
        {} as CustomAxiosRequestConfig<any>,
      )

      return {
        status: response.status,
        body: response.data,
      }
    } catch (error) {
      trackErrors('auth:api:signIn', error)
      throw error
    }
  }

  getOtpCodeByEmail = async (user: UserFormInput): Promise<GetOtpCodeResponse> => {
    try {
      const response = await this.http.post(
        API_URLS.GET_CODE_BY_EMAIL,
        {
          ...user,
          destination: 'AUTH_UNSUBSCRIBE',
        },
        {} as CustomAxiosRequestConfig<any>,
      )

      return {
        status: response.status,
        body: response.data,
      }
    } catch (error) {
      trackErrors('auth:api:otp', error)
      throw error
    }
  }

  autoAuth = async (refreshToken: string): Promise<{ userId: string; email: string }> => {
    try {
      const tokenResponse = await this.updateToken({ refreshToken })

      if (tokenResponse.status !== 200 || !tokenResponse.body?.result?.tkn) {
        throw new Error('Failed to refresh access token')
      }

      const accessToken = tokenResponse.body.result.tkn

      const response = await this.http.get(API_URLS.ACCOUNT, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      } as CustomAxiosRequestConfig<any>)

      if (response.status !== 200) {
        throw new Error('Failed to authenticate user')
      }

      const {
        user: { _id, email, role, profile },
      }: UserAccountResponse = response.data

      localStorage.setItem('userProgram', profile.personalWorkoutType.workoutType)
      localStorage.setItem('mainGoal', profile.goals.name)

      if (role === typeAccessEnum.Limited) {
        window.location.href = `${PUBLIC_URL}${ROUTES.LIMITED}`
      } else {
        TokenService.setTokens({ access: accessToken, refresh: refreshToken, userId: _id })
      }

      return { userId: _id, email }
    } catch (error) {
      trackErrors('auth:api:autoAuth', error)
      throw error
    }
  }

  forgot = async (user: Forgot): Promise<SignInResponse> => {
    try {
      const response = await this.http.post(
        API_URLS.PASSWORD_RESTORE,
        user,
        {} as CustomAxiosRequestConfig<any>,
      )

      return {
        status: response.status,
        body: response.data,
      }
    } catch (error) {
      trackErrors('auth:api:forgot', error)
      throw error
    }
  }

  updateToken = async (data: UpdateTokenRequest): Promise<SignInResponse> => {
    try {
      const response = await this.http.post(
        API_URLS.UPDATE_TOKEN,
        data,
        {} as CustomAxiosRequestConfig<any>,
      )

      return {
        status: response.status,
        body: response.data,
      }
    } catch (error) {
      trackErrors('auth:api:updateToken', error)
      throw error
    }
  }

  deleteUser = async (userID: string): Promise<GetOtpCodeResponse> => {
    try {
      const response = await this.http.delete(API_URLS.ACCOUNT, {
        params: { id: userID },
      } as CustomAxiosRequestConfig<any>)

      return {
        status: response.status,
        body: response.data,
      }
    } catch (error) {
      trackErrors('auth:api:otp', error)
      throw error
    }
  }
}

export const AuthApi = new AuthApiService(new BaseHttpServices(API_URL))
