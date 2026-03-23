import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import CheckSvg from '@/assets/images/fasting/check.svg'
import ArrowSvg from '@/assets/images/fasting/arrow-righ.svg'
import { clsx } from 'clsx'
import InfoModel from '@/components/pages/FastingPage/components/InfoModel'
import { FastingLevel, FastingModel } from '@/components/pages/FastingPage/types/index.types'
import Header from '@/components/Header/Header'

// interface
interface IModelsProps {
  isOpen: boolean
  onClose: () => void
  activeModel: FastingModel
  setModel: (model: FastingModel) => void
  modelsData: FastingLevel[]
}

// component
const Models: FC<Readonly<IModelsProps>> = ({
  isOpen,
  onClose,
  activeModel,
  setModel,
  modelsData,
}) => {
  const { t } = useTranslation()
  const [selectModel, setSelectModel] = useState<FastingModel>(activeModel)
  const [isOpenInfoModel, setIsOpenInfoModel] = useState(false)

  const onClickModel = (model: FastingModel) => {
    setSelectModel(model)
    setIsOpenInfoModel(true)
  }

  // return
  return (
    <>
      <div
        className={`${isOpen ? 'translate-x-0' : 'translate-x-full'}  fixed top-0 right-0 h-full w-full z-40 bg-[#f9fafb] border border-gray transition-all duration-300 flex flex-col`}
      >
        <div className={' max-w-content mx-auto'}>
          <Header
            title={t('changeFastingType')}
            onBackClick={onClose}
            showBtn={true}
            fixed={true}
            withShadow={false}
            isTransparent={true}
          />

          <div
            className={
              'grid gap-8 py-6 px-[18px]   grid-rows-[auto_1fr]   overflow-y-auto overflow-x-hidden'
            }
          >
            {modelsData.map((level, key) => (
              <div
                key={`${key}-${level.levelName}-level`}
                className={'grid gap-3 grid-cols-[minmax(300px,100vw)]'}
              >
                <h3 className={'text-base font-medium text-[#5F6271]'}>{level.levelName}</h3>

                <Swiper
                  slidesPerView={'auto'}
                  className={'w-full overflow-visible'}
                  spaceBetween={15}
                >
                  {level.models.map((model, key) => (
                    <SwiperSlide
                      key={`${key}-${model.id}-model`}
                      className={'grid gap-[11px] p-[24px] rounded-r16 bg-white w-[226px]'}
                      onClick={() => {
                        onClickModel(model)
                      }}
                    >
                      <div className={'grid grid-cols-[1fr_74px] gap-4 items-center'}>
                        <p
                          className={clsx('text-xl45 font-bold transition', {
                            'text-primary': activeModel.id === model.id,
                          })}
                        >
                          {model.fastingDuration}:{model.eatingDuration}
                        </p>

                        <img
                          src={activeModel.id === model.id ? CheckSvg : ArrowSvg}
                          alt={'check model'}
                        />
                      </div>

                      <div className={'grid grid-cols-[1fr_74px] gap-4 items-center'}>
                        <div className={'grid gap-[3px]'}>
                          <p className={'text-xs text-[#89939B] font-semibold'}>{t('fasting')}</p>
                          <p className={'text-base2 text-dark font-bold'}>
                            {model.fastingDuration} h
                          </p>
                        </div>

                        <div>
                          <p className={'text-xs text-[#89939B] font-semibold'}>{t('eating')}</p>
                          <p className={'text-base2 text-dark font-bold'}>
                            {model.eatingDuration} h
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InfoModel
        isOpen={isOpenInfoModel}
        onClose={() => setIsOpenInfoModel(false)}
        activeModel={selectModel}
        onAction={() => {
          onClose()
          setIsOpenInfoModel(false)
          setModel(selectModel)
        }}
      />
    </>
  )
}

export default Models
