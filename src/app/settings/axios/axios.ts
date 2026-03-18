import { API_URL } from '@/constants/variables'
import Axios, { AxiosError, AxiosResponse } from 'axios'
import { TokenService } from '@/services/TokenService'
import { ROUTES } from '@/constants/routes'
import { API_URLS } from '@/constants/api-urls'

const axiosInstance = Axios.create({
  baseURL: API_URL,
  paramsSerializer: {
    indexes: true,
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = TokenService.getAccessToken()
    const locale = TokenService.getLocale()
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
      config.headers['Accept-Language'] = locale
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes(API_URLS.UPDATE_TOKEN)
    ) {
      originalRequest._retry = true

      try {
        const newAccessToken = await TokenService.refreshAccessToken()
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        }
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        TokenService.clearTokens()
        window.location.href = ROUTES.LOGIN
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export const axios = axiosInstance
