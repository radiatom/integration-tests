import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import XHR from 'i18next-http-backend'

import translationEN from '@/locales/en/translations'
import translationUK from '@/locales/uk/translations'
import translationDE from '@/locales/de/translations'
import translationFR from '@/locales/fr/translations'
import translationES from '@/locales/es/translations'
import translationPT from '@/locales/pt/translations'

localStorage.removeItem('i18nextLng')
sessionStorage.removeItem('i18nextLng')

const options = {
  order: ['querystring', 'localStorage', 'sessionStorage', 'navigator'],
  lookupQuerystring: 'lang',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
}
const resources = {
  en: {
    translation: translationEN,
  },
  uk: {
    translation: translationUK,
  },
  de: {
    translation: translationDE,
  },
  es: {
    translation: translationES,
  },
  pt: {
    translation: translationPT,
  },
  fr: {
    translation: translationFR,
  },
}

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    resources,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    supportedLngs:
      process.env.NODE_ENV === 'development'
        ? ['en', 'de', 'es', 'pt', 'fr', 'uk']
        : ['en', 'de', 'es', 'pt', 'fr'],
    fallbackLng: 'en',
    react: {
      useSuspense: false,
    },
  })

export default i18n
