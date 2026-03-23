import React, { FC, useEffect, useState } from 'react'
import Header from '@/components/Header/Header'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Thumbs } from 'swiper/modules'
import { clsx } from 'clsx'
import noteSvg from '@/assets/images/fasting/note.svg'
import { FastingModel, Stage } from '@/components/pages/FastingPage/types/index.types'

// interface
interface IInfoModelProps {
  isOpen: boolean
  onClose: () => void
  activeStage: Stage
  activeModel: FastingModel
}

// component
const BodyStatus: FC<Readonly<IInfoModelProps>> = ({
  isOpen,
  onClose,
  activeStage,
  activeModel,
}) => {
  const { t } = useTranslation()
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperRef['swiper'] | null>(null)
  const [thumbsSwiperSecond, setThumbsSwiperSecond] = useState<SwiperRef['swiper'] | null>(null)
  const initialSlide = activeModel.stages.findIndex((el) => el.id === activeStage.id)
  const [stageShow, setStageShow] = useState(activeStage)

  useEffect(() => {
    setStageShow(activeStage)
  }, [activeStage])

  // return
  return (
    <div
      className={`${isOpen ? 'translate-x-0' : 'translate-x-full'}  fixed top-0 right-0 h-full w-full z-40 bg-white border border-gray transition-all duration-300 flex flex-col`}
    >
      <div className={'grid grid-rows-[auto_1fr] max-w-content w-full h-full mx-auto '}>
        <div className={'bg-[#f9fafb] pt-4'}>
          <Header
            title={t('bodyStatus')}
            onBackClick={onClose}
            showBtn={true}
            fixed={true}
            withShadow={false}
            isTransparent={true}
          />
        </div>

        <div className={'grid h-full grid-rows-[1fr_auto]  overflow-x-hidden overflow-y-auto'}>
          <div
            className={
              'grid h-full grid-rows-[auto_1fr] grid-cols-[minmax(300px,100vw)] bg-[#f9fafb] rounded-[0_0_32px_32px]'
            }
          >
            <Swiper
              effect={'coverflow'}
              centeredSlides={true}
              speed={1000}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 0,
                stretch: -20,
                depth: 600,
                modifier: 1,
                slideShadows: false,
              }}
              modules={[EffectCoverflow, Thumbs]}
              initialSlide={initialSlide}
              key={initialSlide}
              className={'w-full h-[156px] mt-9 mb-7 overflow-visible'}
              onSwiper={setThumbsSwiperSecond}
              thumbs={{ swiper: thumbsSwiper }}
              onSlideChange={(e) => {
                setStageShow(activeModel.stages[e.activeIndex])
              }}
            >
              {activeModel.stages.map((stage, key) => (
                <SwiperSlide
                  key={`${key}-stage-day`}
                  className={'grid items-center w-[155px] gap-[5px] '}
                >
                  <img
                    src={stageShow.id === stage.id ? stage.activeSvg : stage.svg}
                    alt={stage.title}
                    className={clsx('w-[155px] h-[155px] rounded-full ', {
                      'shadow-[0px_4px_8px_0px_#14BD4C33,0px_14px_14px_0px_#14BD4C2B,0px_32px_19px_0px_#14BD4C1A,0px_57px_23px_0px_#14BD4C08,0px_89px_25px_0px_#14BD4C00]':
                        stage.id === stageShow.id,
                      'shadow-[0px_4px_12px_0px_#0000001A]': stage.id !== stageShow.id,
                    })}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              onSlideChange={(e: any) => {
                thumbsSwiperSecond?.slideTo(e.activeIndex)
              }}
              className={'w-full h-full'}
            >
              {activeModel.stages.map((stage, key) => (
                <SwiperSlide key={`${key}-slide-workout `}>
                  <div className={'h-full text-center px-[37px]'}>
                    <h3 className={'font-bold text-xl3 mb-7'}>{stage.title}</h3>

                    <div className={'grid gap-4 mb-8'}>
                      {stage.descriptions.map((desc, key) => (
                        <p
                          className={' font-medium text-center text-[#5F6271]'}
                          key={`${key}-${desc}-p`}
                        >
                          {desc}
                        </p>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={'grid justify-items-center mt-[-25px]'}>
            <img src={noteSvg} alt="Note" className={'mb-3'} />

            <p className={'mb-[6px] text-[#ED8000] font-bold text-xl'}>{t('pleaseNote')}</p>

            <p className={' mb-4 text-[#5F6271] font-medium text-xs max-w-[282px] text-center'}>
              {t('fastingDisclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BodyStatus
