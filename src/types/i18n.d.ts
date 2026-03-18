import 'i18next'
import type translationEN from '@/locales/en/translations'

export type DefaultNamespace = typeof translationEN

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: DefaultNamespace
    }
  }
}
