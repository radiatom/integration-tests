import { useTranslation } from 'react-i18next'
import { Stage } from '@/components/pages/FastingPage/types/index.types'
import Stage0Card from '@/assets/images/fasting/stage-0-card.svg'

const UseGetModelsData = (): Stage => {
  const { t } = useTranslation()

  // return
  return {
    id: 0,
    activeSvg: '',
    svg: '',
    svgProgress: '',
    svgProgressInactive: '',
    svgCard: Stage0Card,
    title: t('youCanEatNow'),
    descriptionSmall: t('fastingNutritionTip'),
    descriptions: [''],
    durationHours: 0,
  }
}

export default UseGetModelsData
