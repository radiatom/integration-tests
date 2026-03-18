import React, { useEffect, useState } from 'react'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import Layout from '@/components/Layout'
import useMealsDays from '@/hooks/useMealsDays'
import { Loader } from '@/components/Loader/Loader'
import { RationDayData, RecipeData } from '@/types/interfaces'
import useMeals from '@/hooks/useMeals'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel, Thumbs } from 'swiper/modules'
import MealCard from '@/components/MealCard/MealCard'
import { Link, useSearchParams } from 'react-router-dom'
import arrowBackSvg from '@/assets/images/svg/arrow-back-thin.svg'
import { ROUTES } from '@/constants/routes'

interface DayInterface {
  day: string
  weekday: string
  weekdayLong: string
  date: string
  rationDay?: RationDayData
}

// component
const MealsPage = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, isLoading: isLoadingDays } = useMealsDays()
  const now = new Date().toLocaleDateString()
  const [activeDay, setActiveDay] = useState<DayInterface | undefined>()
  const [days, setDays] = useState<DayInterface[] | undefined>()
  const [initialSlide, setInitialSlide] = useState<number | undefined>()
  const [isChangeDay, setIsChangeDay] = useState(false)
  const [meals, setMeals] = useState<(RecipeData | undefined)[]>()
  const [ids, setIds] = useState<string[] | undefined>()
  const mealsData = useMeals(ids, false)
  const isBatchLoading = mealsData?.some((result) => result.isLoading) || false
  const allSuccess = mealsData?.every((result) => result.isSuccess) || false

  const generateDays = (startDateISO: string, count: number): DayInterface[] => {
    const locale = i18next.language
    const startDate = new Date(startDateISO)

    return Array.from({ length: count }, (_, i) => {
      const current = new Date(startDate)
      current.setDate(startDate.getDate() + i)

      const day = new Intl.DateTimeFormat(locale, { day: '2-digit' }).format(current)
      const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(current)
      const weekdayLong = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(current)

      return {
        day,
        weekday,
        weekdayLong,
        date: current.toLocaleDateString(),
        rationDay: data?.ration[i],
      }
    })
  }

  useEffect(() => {
    if (data) {
      setDays(generateDays(data.startCountdownAt, data.ration.length + 7))
    }
  }, [data])

  useEffect(() => {
    if (!ids) return

    if (mealsData.length > 0 && allSuccess) {
      setMeals(mealsData.map((el) => el.data?.page))
    }
  }, [ids, allSuccess])

  useEffect(() => {
    if (days) {
      const day = searchParams.get('day')
        ? days.find((el) => el.date === searchParams.get('day'))
        : days[0]
      setActiveDay(day)
      if (!isChangeDay) {
        setInitialSlide(days.findIndex((el) => el.date === day?.date))
      }
      if (
        day?.rationDay &&
        day.rationDay.breakfast &&
        day.rationDay.lunch &&
        day.rationDay.snack &&
        day.rationDay.dinner
      ) {
        setIds([
          day.rationDay.breakfast,
          day.rationDay.lunch,
          day.rationDay.snack,
          day.rationDay.dinner,
        ])
      }
    }
  }, [days, searchParams.get('day'), isChangeDay])

  // return
  return (
    <Layout>
      <div className="overflow-y-auto min-h-full overflow-x-hidden pb-[70px]">
        <div className={'py-[14px] px-[16px] sticky top-0 left-0 bg-white shadow-header z-10'}>
          <div className={'grid gap-2 items-center grid-cols-[auto_1fr] mb-[14px]'}>
            <Link
              className={'cursor-pointer  transition-all duration-300 active:scale-95'}
              to={ROUTES.PLAN}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-backButtonBorder hover:opacity-70 transition-all duration-300">
                <img width={24} height={24} src={arrowBackSvg} alt="arrow-back" />
              </div>
            </Link>

            <h3 className={'text-xl4 font-semibold text-dark '}>{t('meals')}</h3>
          </div>

          {isLoadingDays ? (
            <Loader />
          ) : (
            <Swiper
              modules={[FreeMode, Thumbs, Mousewheel]}
              mousewheel={true}
              slidesPerView={'auto'}
              spaceBetween={3}
              initialSlide={initialSlide}
              key={initialSlide}
              className={'relative'}
            >
              {days?.map((day, key) => (
                <SwiperSlide
                  key={`${key}-${day.date}`}
                  className={`grid w-fit p-[6px] rounded-[13px] justify-items-center  cursor-pointer bg-[#00000008] ${key > (data?.ration.length || 0) && 'opacity-50 pointer-events-none'}`}
                  onClick={() => {
                    setSearchParams(`?day=${day.date}`)
                    setIsChangeDay(true)
                  }}
                >
                  <p
                    className={`rounded-r8 py-[5px] text-center font-medium text-[16px] shadow-[0_2px_4px_0_#00000005] ${day.date === now ? ' w-[67px]' : 'w-8'} ${activeDay?.date === day.date ? 'bg-green text-white' : 'bg-white text-secondary'}`}
                  >
                    {day.date === now ? t('today') : day.day}
                  </p>

                  <p
                    className={`font-semibold text-[10px] ${activeDay?.date === day.date ? 'text-secondary' : 'text-[#B7BABE]'}`}
                  >
                    {day.date === now ? day.weekdayLong : day.weekday}
                  </p>
                </SwiperSlide>
              ))}

              <div
                className={
                  'absolute right-0 top-0 h-full w-71 bg-[linear-gradient(270deg,#FFFFFF_13.97%,rgba(255,255,255,0)_100%)] z-10'
                }
              />
            </Swiper>
          )}
        </div>

        {isBatchLoading ? (
          <Loader />
        ) : (
          <div className={'grid gap-2 pt-4 px-4 pb-8'}>
            {meals &&
              meals
                .filter((el) => el !== undefined)
                .map((meal, key) => (
                  <MealCard key={`${key}-${meal?.id}`} meal={meal as RecipeData} />
                ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default MealsPage
