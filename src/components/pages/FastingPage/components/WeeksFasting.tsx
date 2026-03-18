import React, { FC, useEffect, useMemo, useState } from 'react'
import { useGlobalStore } from '@/stores'
import { addDays, format, isSameDay, parseISO, startOfWeek } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import arrowBackSvg from '@/assets/images/svg/arrow-back-thin.svg'
import { clsx } from 'clsx'
import useGetLocaleForDate from '@/components/pages/FastingPage/hooks/useGetLocaleForDate'

// interface

interface DayInfo {
  date: Date
  progressMinutes: number
  progress: number
}
interface weekInfo {
  days: DayInfo[]
  averageMinutes: number
  isCurrentWeek: boolean
  nameWeek: string
}
interface IWeeksFastingProps {}

// component
const WeeksFasting: FC<Readonly<IWeeksFastingProps>> = () => {
  const { t } = useTranslation()
  const [swiper, setSwiper] = useState<SwiperRef['swiper'] | null>(null)
  const completedFastings = useGlobalStore((state) => state.completedFastings)

  const locale = useGetLocaleForDate()

  const formatFastingTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    const formattedMinutes = String(minutes).padStart(2, '0')

    return hours
      ? `${hours} ${t('format_h')} ${formattedMinutes} ${t('format_min')}`
      : `${formattedMinutes} ${t('format_min')}`
  }

  const weeks = useMemo((): weekInfo[] => {
    const now = new Date()

    const startOfWeeks = (completedFastings ?? [])
      .reduce(
        (acc: Date[], el) => {
          const monday = startOfWeek(parseISO(el.dateStart), { weekStartsOn: 0 })
          return acc.find((d) => isSameDay(d, monday)) ? acc : [...acc, monday]
        },
        [startOfWeek(now, { weekStartsOn: 0 })],
      )
      .sort((a, b) => a.getTime() - b.getTime())

    return startOfWeeks.map((monday) => {
      const days = Array.from({ length: 7 }, (_, i) => {
        const date = addDays(monday, i)
        const fast = completedFastings?.find((el) => isSameDay(parseISO(el.dateStart), date))
        return { date, progressMinutes: fast?.fastingMinutes || 0, progress: fast?.progress || 0 }
      })

      const isCurrentWeek = days.some((d) => isSameDay(d.date, now))
      const totalMinutes = days.reduce(
        (sum, d) => sum + (d.progressMinutes > 30 ? d.progressMinutes : 0),
        0,
      )

      return {
        days,
        isCurrentWeek,
        averageMinutes: Math.round(totalMinutes / days.length),
        nameWeek: isCurrentWeek
          ? t('thisWeek')
          : `${format(days[0].date, 'MMM d', { locale })} - ${format(days[6].date, 'MMM d yyyy', { locale })}`,
      }
    })
  }, [completedFastings])

  const [isFirst, setIsFirst] = useState(!(weeks.length > 1))
  const [isLast, setIsLast] = useState(true)

  useEffect(() => {
    if (swiper) {
      setIsFirst(swiper.isBeginning)
      setIsLast(swiper.isEnd)
    }
  }, [weeks, swiper])

  // return
  return (
    <div className={'py-6 px-[20px] mb-[20px] rounded-[32px] border border-[#00000012]'}>
      <div className={'relative '}>
        <Swiper
          className={'mb-[37px]'}
          initialSlide={weeks.findIndex((el) => el.isCurrentWeek)}
          onSwiper={setSwiper}
          onSlideChange={(s) => {
            setIsFirst(s.isBeginning)
            setIsLast(s.isEnd)
          }}
        >
          {weeks.map((week, key) => (
            <SwiperSlide key={`${key}-${week.nameWeek}-week`}>
              <p className={'font-bold text-xl2 text-center'}>{week.nameWeek}</p>

              <p
                className={
                  'pb-[10px] mb-3 border-b border-[#F0F0F0] font-semibold text-md2 text-center text-[#98A1A8] '
                }
              >
                {t('average')} {formatFastingTime(week.averageMinutes)}
              </p>

              <div className={'flex justify-between'}>
                {week.days.map((day, key) => (
                  <div
                    key={`${day.date}-${key}-day`}
                    className={'grid gap-[26px] justify-items-center'}
                  >
                    <div
                      className={
                        'relative w-2 h-[73px] rounded-full bg-[#D9D9D966] overflow-hidden'
                      }
                    >
                      <div
                        className={`absolute bottom-0 left-0 w-full rounded-full ${day.progress === 100 ? 'bg-green' : 'bg-[#FAB70E]'}`}
                        style={{ height: day.progress + '%' }}
                      />
                    </div>

                    <div className={'text-[#B1B1B1] opacity-50'}>{format(day.date, 'E')}</div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          onClick={() => swiper?.slidePrev()}
          className={clsx(
            'absolute top-0 left-0 flex items-center justify-center w-[42px] h-[42px] rounded-full bg-white border border-backButtonBorder  transition-all duration-300 cursor-pointer z-10',
            { 'opacity-50 pointer-events-none': isFirst },
          )}
        >
          <img width={24} height={24} src={arrowBackSvg} alt="arrow-back" />
        </div>

        <div
          onClick={() => swiper?.slideNext()}
          className={clsx(
            'absolute rotate-180 top-0 right-0 flex items-center justify-center w-[42px] h-[42px] rounded-full bg-white border border-backButtonBorder  transition-all duration-300 cursor-pointer z-10',
            { 'opacity-50 pointer-events-none': isLast },
          )}
        >
          <img width={24} height={24} src={arrowBackSvg} alt="arrow-back" />
        </div>
      </div>

      <div className={'grid grid-cols-[auto_1fr] gap-[41px]'}>
        <div className={'grid grid-cols-[auto_auto] gap-[7px] items-center'}>
          <div className={'w-[6px] h-[6px] bg-green rounded-full'} />

          <p className={'text-gray9 font-medium text-xs2_1 leading-none'}>{t('goalReached')}</p>
        </div>

        <div className={'grid grid-cols-[auto_auto] gap-[7px] items-center w-fit'}>
          <div className={'w-[6px] h-[6px] bg-[#FAB70E] rounded-full'} />

          <p className={'text-gray9 font-medium text-xs2_1 leading-none'}>{t('goalNotReached')}</p>
        </div>
      </div>
    </div>
  )
}

export default WeeksFasting
