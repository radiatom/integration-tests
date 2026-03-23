// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import '@/i18n'

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

// useNavigate
export const mockUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

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

// module.exports = {
//   collectCoverageFrom: [
//     'src/**/*.{ts,tsx,js,jsx}',
//     '!src/**/*.types.ts', // Виключаємо файли типів за назвою
//     '!src/**/types/*.ts', // Виключаємо цілі папки з типами
//     '!src/**/*.{stories,constants,test,spec}.{ts,tsx}',
//   ],
// }
