import { AuthApi } from './api/AuthApiService'

export class TokenService {
  private static readonly ACCESS_TOKEN_KEY = 'accessToken'
  private static readonly LOCALE = 'i18nextLng'
  private static readonly REFRESH_TOKEN_KEY = 'refreshToken'
  private static readonly USER_ID_KEY = 'userId'

  private static authStateCallback: (() => void) | null = null

  static setAuthStateCallback(callback: (() => void) | null) {
    this.authStateCallback = callback
  }

  static setTokens({
    access,
    refresh,
    userId,
  }: {
    access?: string
    refresh?: string
    userId?: string
  }): void {
    if (access) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, access)
    }

    if (refresh) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refresh)
    }

    if (userId) {
      localStorage.setItem(this.USER_ID_KEY, userId)
    }

    if (this.authStateCallback) {
      this.authStateCallback()
    }
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  static getLocale(): string | null {
    return localStorage.getItem(this.LOCALE)
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  static getUserId(): string | null {
    return localStorage.getItem(this.USER_ID_KEY)
  }

  static clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    localStorage.removeItem(this.USER_ID_KEY)

    if (this.authStateCallback) {
      this.authStateCallback()
    }
  }

  static async refreshAccessToken(): Promise<string> {
    const refreshToken = this.getRefreshToken()

    if (!refreshToken) {
      throw new Error('Refresh token not found')
    }

    try {
      const response = await AuthApi.updateToken({ refreshToken })

      if (response.status === 200 && response.body?.result?.tkn) {
        const newAccessToken = response.body.result.tkn
        localStorage.setItem(this.ACCESS_TOKEN_KEY, newAccessToken)
        return newAccessToken
      } else {
        throw new Error('Failed to refresh token')
      }
    } catch (error) {
      this.clearTokens()
      throw error
    }
  }

  static hasTokens(): boolean {
    const hasAccess = !!this.getAccessToken()
    const hasRefresh = !!this.getRefreshToken()
    return hasAccess && hasRefresh
  }
}
