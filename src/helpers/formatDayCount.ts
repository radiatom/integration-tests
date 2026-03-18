type Language = 'de' | 'en' | 'es' | 'fr' | 'pt' | 'uk'

const dayTranslations: Record<Language, { one: string; other: string; few?: string }> = {
  en: { one: 'day', other: 'days' },
  de: { one: 'Tag', other: 'Tage' },
  es: { one: 'día', other: 'días' },
  fr: { one: 'jour', other: 'jours' },
  pt: { one: 'dia', other: 'dias' },
  uk: { one: 'день', few: 'дні', other: 'днів' },
}

export const formatDayCount = (count: number, lang: string): string => {
  const forms = dayTranslations[lang as Language]

  if (lang === 'uk') {
    const mod10 = count % 10
    const mod100 = count % 100

    if (mod10 === 1 && mod100 !== 11) {
      return forms.one
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return forms.few || forms.other
    } else {
      return forms.other
    }
  }

  return count === 1 ? forms.one : forms.other
}
