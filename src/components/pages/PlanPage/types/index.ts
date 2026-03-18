export type I18nKey = any

export const STEPS = {
  COPY: 'copy',
  TEXT: 'text',
} as const

export type TypeKey = (typeof STEPS)[keyof typeof STEPS]

export type TStepItem = {
  type: TypeKey
  title?: I18nKey
  image?: string
}
