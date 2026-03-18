type Language = 'de' | 'en' | 'es' | 'fr' | 'pt' | 'uk'

interface DaysLeftTranslation {
  one: string
  other: string
  few?: string
}

const daysLeftTranslations: Record<Language, DaysLeftTranslation> = {
  en: { one: 'day left', other: 'days left' },
  de: { one: 'Tag übrig', other: 'Tage übrig' },
  es: { one: 'día restante', other: 'días restantes' },
  fr: { one: 'jour restant', other: 'jours restants' },
  pt: { one: 'dia restante', other: 'dias restantes' },
  uk: {
    one: 'день залишився',
    few: 'дні залишилося',
    other: 'днів залишилося',
  },
}

export const formatDaysLeftTranslations = (count: number, lang: string): string => {
  const forms = daysLeftTranslations[lang as Language] || daysLeftTranslations.en

  if (lang === 'uk') {
    const mod10 = count % 10
    const mod100 = count % 100

    if (mod10 === 1 && mod100 !== 11) {
      return `${count} ${forms.one}`
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return `${count} ${forms.few}`
    } else {
      return `${count} ${forms.other}`
    }
  }

  const form = count === 1 ? forms.one : forms.other
  return `${count} ${form}`
}
