import i18n from '@/i18n'

const formatDate = (value: string | Date): string => {
  const date = typeof value === 'string' ? new Date(value) : value
  return date.toLocaleDateString(i18n.language, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default formatDate
