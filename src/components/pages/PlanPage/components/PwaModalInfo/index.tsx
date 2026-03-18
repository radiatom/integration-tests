import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { PwaModalWrapper, CopyLink } from './components'
import { I18nKey, STEPS, TStepItem } from '@/components/pages/PlanPage/types'

type PwaModalInfoProps = {
  title: I18nKey
  subtitle: I18nKey
  thumbnail: string
  steps: TStepItem[]
  onClose: () => void
  isOpen: boolean
}

export const PwaModalInfo = ({
  title,
  thumbnail,
  subtitle,
  steps,
  onClose,
  isOpen,
}: PwaModalInfoProps) => {
  const { t } = useTranslation()

  return (
    <PwaModalWrapper onClose={onClose} isOpen={isOpen}>
      <h2 className="text-center text-balance text-xl2 font-semibold leading-[150%] mb-0.5 max-w-[calc(100%-66px)] mx-auto">
        {t(title)}
      </h2>

      <p className="text-center text-xs2_1 text-secondary font-[450] mb-2">{t(subtitle)}</p>

      <img src={thumbnail} alt="info-thumbnail" />

      <ul>
        {steps.map(({ type, title, image }, idx) => {
          const ordinalNumber = idx + 1
          return (
            <li key={idx} className="pt-6 pb-4">
              {type === STEPS.COPY && <CopyLink index={ordinalNumber} />}
              {type === STEPS.TEXT && (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#E9F9F0] flex items-center justify-center">
                      {ordinalNumber}
                    </div>

                    {title && (
                      <p className="text-md">
                        <Trans
                          i18nKey={title}
                          components={{
                            bold: <span className="font-semibold leading-[140%]" />,
                          }}
                        />
                      </p>
                    )}
                  </div>
                  {image && <img src={image} alt="info-item" className="mt-4" />}
                </>
              )}
            </li>
          )
        })}
      </ul>
    </PwaModalWrapper>
  )
}
