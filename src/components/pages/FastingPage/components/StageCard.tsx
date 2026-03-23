import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Stage } from '@/components/pages/FastingPage/types/index.types'

// interface
interface IStageCardProps {
  stage: Stage
  onReadMore?: () => void
}

// component
const StageCard: FC<Readonly<IStageCardProps>> = ({ stage, onReadMore }) => {
  const { t } = useTranslation()

  // return
  return (
    <div className={'grid py-4 px-6 grid-cols-[auto_1fr] gap-4'}>
      <img src={stage.svgCard} alt={`${stage.title}`} />

      <div>
        <h4 className={'text-xl font-bold mb-[2px]'}>{stage.title}</h4>
        <p className={'mb-[6px]  font-medium text-[#5F6271] leading-[150%]'}>
          {stage.descriptionSmall}
        </p>

        {onReadMore && (
          <button onClick={onReadMore} className={'font-semibold text-[#008FFF]'}>
            {t('learnMore')}
          </button>
        )}
      </div>
    </div>
  )
}

export default StageCard
