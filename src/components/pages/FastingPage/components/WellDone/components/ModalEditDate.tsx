import React, { Dispatch, FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import OnClickOutside from '@/components/OnClickOutside/OnClickOutside'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'
import { clsx } from 'clsx'
import { addDays, eachDayOfInterval, format, set, subDays } from 'date-fns'

// interface
export interface IModalProps {
  onClose: () => void
  typeEditDate: 'start' | 'end'
  dateStartFasting: Date
  dateEndFasting: Date
  locale: any
  setDateUpdatedStartFasting: Dispatch<React.SetStateAction<Date | undefined>>
  setDateUpdatedEndFasting: Dispatch<React.SetStateAction<Date | undefined>>
}

// component
const ModalEditDate: FC<Readonly<IModalProps>> = ({
  onClose,
  typeEditDate,
  dateStartFasting,
  dateEndFasting,
  locale,
  setDateUpdatedStartFasting,
  setDateUpdatedEndFasting,
}) => {
  const { t } = useTranslation()
  const coverflowEffect = {
    rotate: 0,
    stretch: 0,
    depth: 120,
    modifier: 1,
    slideShadows: false,
  }
  const [swiperDays, setSwiperDays] = useState<SwiperRef['swiper'] | null>(null)
  const [swiperHours, setSwiperHours] = useState<SwiperRef['swiper'] | null>(null)
  const [swiperMinutes, setSwiperMinutes] = useState<SwiperRef['swiper'] | null>(null)

  const [updateDate, setUpdateDate] = useState(
    typeEditDate === 'start' ? dateStartFasting : dateEndFasting,
  )
  const days = useMemo(() => {
    const startDate = subDays(dateEndFasting, 3)
    const endDate = addDays(dateEndFasting, 3)

    return eachDayOfInterval({
      start: startDate,
      end: endDate,
    })
  }, [])
  const initialSlideDayIndex = useMemo(
    () =>
      days.findIndex(
        (el) =>
          el.getDay() ===
          (typeEditDate === 'start' ? dateStartFasting.getDay() : dateEndFasting.getDay()),
      ),
    [],
  )

  const hours = Array(24).fill(null)
  const initialSlideHourIndex = useMemo(
    () =>
      hours.findIndex(
        (_, key) =>
          key ===
          (typeEditDate === 'start' ? dateStartFasting.getHours() : dateEndFasting.getHours()),
      ),
    [],
  )

  const minutes = Array(60).fill(null)
  const initialSlideMinutesIndex = useMemo(
    () =>
      minutes.findIndex(
        (_, key) =>
          key ===
          (typeEditDate === 'start' ? dateStartFasting.getMinutes() : dateEndFasting.getMinutes()),
      ),
    [],
  )

  const onUpdatedDate = (day?: number, hour?: number, minute?: number) => {
    const updatedDate = set(updateDate, {
      date: day,
      hours: hour,
      minutes: minute,
    })

    if (typeEditDate === 'start') {
      if (updatedDate <= dateEndFasting) {
        setUpdateDate(updatedDate)
      } else {
        const finishDayIndex = days.findIndex((el) => el.getDate() === dateEndFasting.getDate())
        const finishHourIndex = hours.findIndex((_, key) => key === dateEndFasting.getHours())
        const finishMinutesIndex = minutes.findIndex(
          (_, key) => key === dateEndFasting.getMinutes(),
        )

        if (finishDayIndex !== -1) {
          swiperDays?.slideTo(finishDayIndex, 1000, false)
        }
        if (finishHourIndex !== -1) {
          swiperHours?.slideTo(finishHourIndex, 1000, false)
        }
        if (finishMinutesIndex !== -1) {
          swiperMinutes?.slideTo(finishMinutesIndex, 1000, false)
        }

        setUpdateDate(dateEndFasting)
      }
    }

    if (typeEditDate === 'end') {
      const now = new Date()

      if (updatedDate < dateStartFasting || updatedDate > now) {
        if (updatedDate < dateStartFasting) {
          const finishDayIndex = days.findIndex((el) => el.getDate() === dateStartFasting.getDate())
          const finishHourIndex = hours.findIndex((_, key) => key === dateStartFasting.getHours())
          const finishMinutesIndex = minutes.findIndex(
            (_, key) => key === dateStartFasting.getMinutes(),
          )

          if (finishDayIndex !== -1) {
            swiperDays?.slideTo(finishDayIndex, 1000, false)
          }
          if (finishHourIndex !== -1) {
            swiperHours?.slideTo(finishHourIndex, 1000, false)
          }
          if (finishMinutesIndex !== -1) {
            swiperMinutes?.slideTo(finishMinutesIndex, 1000, false)
          }

          setUpdateDate(dateStartFasting)
        }

        if (updatedDate > now) {
          const finishDayIndex = days.findIndex((el) => el.getDate() === now.getDate())
          const finishHourIndex = hours.findIndex((_, key) => key === now.getHours())
          const finishMinutesIndex = minutes.findIndex((_, key) => key === now.getMinutes())

          if (finishDayIndex !== -1) {
            swiperDays?.slideTo(finishDayIndex, 1000, false)
          }
          if (finishHourIndex !== -1) {
            swiperHours?.slideTo(finishHourIndex, 1000, false)
          }
          if (finishMinutesIndex !== -1) {
            swiperMinutes?.slideTo(finishMinutesIndex, 1000, false)
          }

          setUpdateDate(now)
        }
      } else {
        setUpdateDate(updatedDate)
      }
    }
  }

  const onSaveClick = () => {
    if (typeEditDate === 'start' && updateDate) {
      setDateUpdatedStartFasting(updateDate)
      onClose()
    }
    if (typeEditDate === 'end' && updateDate) {
      setDateUpdatedEndFasting(updateDate)
      onClose()
    }
  }

  // return
  return (
    <div
      className={
        'grid items-end fixed top-0 left-0 w-full min-h-full bg-[rgba(41,41,58,0.23)] z-40 '
      }
    >
      <OnClickOutside onClick={onClose}>
        <div
          className={
            'grid grid-rows-[auto_auto_1fr_auto] relative justify-items-center gap-2 max-w-content mx-auto h-fit rounded-[32px_32px_0_0] bg-white shadow-lg overflow-hidden px-[46px] pt-4'
          }
        >
          <div className={'w-[36px] h-[6px] mb-8 rounded-r20 bg-level'} />

          <h4 className={'mb-8 font-semibold text-xl3 text-center text-dark'}>
            {typeEditDate === 'start' ? t('editFastingStartTime') : t('editFastingFinishTime')}
          </h4>

          <div className={'grid grid-cols-[50%_25%_25%] relative w-full h-[216px] mb-8'}>
            <Swiper
              effect={'coverflow'}
              direction={'vertical'}
              centeredSlides={true}
              slidesPerView={5}
              speed={1000}
              coverflowEffect={coverflowEffect}
              modules={[EffectCoverflow]}
              initialSlide={initialSlideDayIndex}
              key={initialSlideDayIndex}
              className={
                ' h-full  z-20 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]'
              }
              onSlideChange={(e) => {
                onUpdatedDate(days[e.activeIndex].getDate(), undefined, undefined)
              }}
              onSwiper={setSwiperDays}
            >
              {days.map((day, key) => (
                <SwiperSlide key={`${key}-slide-plan`} className={'h-9 grid items-center'}>
                  <p className={clsx('text-base text-center')}>
                    {format(day.toISOString(), 'EEE, dd MMM', { locale })}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              effect={'coverflow'}
              direction={'vertical'}
              centeredSlides={true}
              slidesPerView={5}
              speed={1000}
              coverflowEffect={coverflowEffect}
              modules={[EffectCoverflow]}
              initialSlide={initialSlideHourIndex}
              key={`${initialSlideHourIndex}-hour`}
              className={
                ' h-full  z-20 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]'
              }
              onSlideChange={(e) => {
                onUpdatedDate(undefined, e.activeIndex, undefined)
              }}
              onSwiper={setSwiperHours}
            >
              {hours.map((_, key) => (
                <SwiperSlide key={`${key}-slide-plan-hour`} className={'h-9 grid items-center'}>
                  <p className={clsx('text-base text-center')}>
                    {key.toString().length < 2 ? `0${key}` : key}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              effect={'coverflow'}
              direction={'vertical'}
              centeredSlides={true}
              slidesPerView={5}
              speed={1000}
              coverflowEffect={coverflowEffect}
              modules={[EffectCoverflow]}
              initialSlide={initialSlideMinutesIndex}
              key={`${initialSlideMinutesIndex}-min`}
              className={
                ' h-full  z-20 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]'
              }
              onSlideChange={(e) => {
                onUpdatedDate(undefined, undefined, e.activeIndex)
              }}
              onSwiper={setSwiperMinutes}
            >
              {minutes.map((_, key) => (
                <SwiperSlide key={`${key}-slide-plan-minute`} className={'h-9 grid items-center'}>
                  <p className={clsx('text-base text-center')}>
                    {key.toString().length < 2 ? `0${key}` : key}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>

            <div
              className={
                'grid justify-items-end w-full h-9 rounded-[7px] bg-[#F2F3F3] absolute top-1/2 -translate-y-1/2 left-0 z-10 pointer-events-none'
              }
            >
              <span className={'pt-1 mr-[88px]'}>:</span>
            </div>
          </div>

          <Button onClick={() => onSaveClick()} className={'mb-8'}>
            {t('save')}
          </Button>
        </div>
      </OnClickOutside>
    </div>
  )
}

export default ModalEditDate
