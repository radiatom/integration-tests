// src/helpers/formatMilestoneCount.ts

type Language = 'de' | 'en' | 'es' | 'fr' | 'pt' | 'uk'

const milestoneTranslations: Record<Language, { one: string; other: string; few?: string }> = {
  en: { one: 'milestone', other: 'milestones' },
  de: { one: 'Meilenstein', other: 'Meilensteine' },
  es: { one: 'hito', other: 'hitos' },
  fr: { one: 'étape', other: 'étapes' },
  pt: { one: 'marco', other: 'marcos' },
  uk: { one: 'етап', few: 'етапи', other: 'етапів' },
}

export const formatMilestoneCount = (count: number, lang: string): string => {
  const forms = milestoneTranslations[lang as Language] || milestoneTranslations.en

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
