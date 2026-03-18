import { enUS, uk, fr, de, es, pt } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'

// component
const UseGetLocaleForDate = () => {
  const { i18n } = useTranslation()
  const dateLocalesMap = {
    en: enUS,
    uk,
    fr,
    de,
    es,
    pt,
  }
  return dateLocalesMap[i18n.language] || dateLocalesMap.en
}

export default UseGetLocaleForDate
