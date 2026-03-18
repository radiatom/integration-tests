type Language = 'de' | 'en' | 'es' | 'fr' | 'pt' | 'uk'

const translations: Record<Language, { one: string; other: string; few?: string }> = {
  en: { one: 'time', other: 'times' },
  de: { one: 'Mal', other: 'Male' },
  es: { one: 'vez', other: 'veces' },
  fr: { one: 'fois', other: 'fois' },
  pt: { one: 'vez', other: 'vezes' },
  uk: { one: 'раз', few: 'рази', other: 'разів' },
}

export const formatTextCount = (count: number, lang: string): string => {
  const forms = translations[lang]

  if (lang === 'uk') {
    const mod10 = count % 10
    const mod100 = count % 100

    if (mod10 === 1 && mod100 !== 11) {
      return forms.one
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return forms.few + ''
    } else {
      return forms.other
    }
  }

  return count === 1 ? forms.one : forms.other
}
