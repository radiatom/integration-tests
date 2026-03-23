/* eslint-disable no-console */

import axios, { AxiosResponse, RawAxiosRequestConfig } from 'axios'
import { ResponseError } from '@/types/error-entity'

export interface CustomAxiosRequestConfig<P = any> extends RawAxiosRequestConfig<P> {
  isRetry?: boolean
}

export class BaseHttpServices {
  constructor(private baseURL?: string) {
    if (this.baseURL) {
      axios.defaults.baseURL = this.baseURL
    }
  }

  getErrorMessage(message: string): string | undefined {
    return message
  }

  onError(error: any) {
    if (!error.response) {
      console.error('Network error:', error)
      return new ResponseError(
        { status: 0, statusText: 'Network Error', data: {} },
        'Network error occurred. Please try again later.',
      )
    }

    const status = error.response.status

    if (status === 401) {
      console.warn('Unauthorized request:', error)
    } else if (status === 500) {
      console.error('Server error:', error)
    }

    return new ResponseError(error.response, this.getErrorMessage(error.response?.data?.message))
  }

  async get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: CustomAxiosRequestConfig<D>,
  ): Promise<R> {
    try {
      const response = await axios.get(url, config)

      return response as unknown as Promise<R>
    } catch (error) {
      throw this.onError(error)
    }
  }

  async post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig<any>,
  ): Promise<R> {
    try {
      const response = await axios.post(url, data, config)

      return response as unknown as Promise<R>
    } catch (error) {
      throw this.onError(error)
    }
  }

  async patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig<any>,
  ): Promise<R> {
    try {
      const response = await axios.patch(url, data, config)

      return response as unknown as Promise<R>
    } catch (error) {
      throw this.onError(error)
    }
  }

  async put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig<any>,
  ): Promise<R> {
    try {
      const response = await axios.put(url, data, config)

      return response as unknown as Promise<R>
    } catch (error) {
      throw this.onError(error)
    }
  }

  async delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: CustomAxiosRequestConfig<any>,
  ): Promise<R> {
    try {
      const response = await axios.delete(url, config)

      return response as unknown as Promise<R>
    } catch (error) {
      throw this.onError(error)
    }
  }
}
