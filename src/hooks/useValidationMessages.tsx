import { useTranslation } from 'react-i18next'

const useValidationMessages = () => {
  const { t } = useTranslation()
  return {
    requiredName: t('requiredName'),
    requiredEmail: t('requiredEmail'),
    requiredPassword: t('requiredPassword'),
    invalidEmail: t('invalidEmail'),
    minLengthPassword: t('minLengthPassword'),
    invalidPassword: t('invalidPassword'),
  }
}

export default useValidationMessages
