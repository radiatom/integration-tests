// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import '@/i18n'
import useGetUserChallengeTrophies from '@/hooks/useGetUserChallengeTrophies'
import { UserChallengesAvailableResponse, UserChallengeTrophiesResponse } from '@/types/interfaces'

beforeAll(() => {
  Object.defineProperty(global.Image.prototype, 'src', {
    set(src: string) {
      setTimeout(() => {
        if (src.includes('fail') || src === '') {
          this.onerror?.(new Event('error'))
        } else {
          this.onload?.()
        }
      }, 50)
    },
  })
})

jest.mock('@/app/settings/axios/axios', () => ({
  axios: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    defaults: {},
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  },
}))

// useNavigate
export const mockUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

// useGetUserChallengeTrophies
jest.mock('@/hooks/useGetUserChallengeTrophies')
export const mockUseGetUserChallengeTrophies = ({
  data,
  isLoading,
}: {
  data: UserChallengeTrophiesResponse | undefined
  isLoading: boolean
}) =>
  (useGetUserChallengeTrophies as jest.Mock).mockReturnValue({
    data,
    isLoading,
  })

// useGetUserChallengeAvailable
jest.mock('@/hooks/useGetUserChallengeAvailable')
export const mockUseGetUserChallengeAvailable = ({
  data,
  isLoading,
}: {
  data: UserChallengesAvailableResponse | undefined
  isLoading: boolean
}) =>
  (useGetUserChallengeTrophies as jest.Mock).mockReturnValue({
    data,
    isLoading,
  })
