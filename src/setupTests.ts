// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import '@/i18n'

beforeAll(() => {
  Object.defineProperty(global.Image.prototype, 'src', {
    set(src: string) {
      // Імітуємо асинхронність завантаження
      setTimeout(() => {
        if (src.includes('fail') || src === '') {
          // Викликаємо onerror, якщо посилання "бите"
          this.onerror?.(new Event('error'))
        } else {
          // Викликаємо onload, якщо все добре
          this.onload?.()
        }
      }, 50) // невелика затримка для реалістичності
    },
  })
})
