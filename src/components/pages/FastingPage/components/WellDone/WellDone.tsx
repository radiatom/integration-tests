import React, { FC, useEffect, useState } from 'react'
import { formatSeconds } from '@/helpers/formatSeconds'
import Clock from '@/assets/images/fasting/clock.webp'
import { differenceInMinutes, differenceInSeconds, format, isSameDay, parseISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import PencilSvg from '@/assets/images/fasting/pencil.svg'
import ModalEditDate from '@/components/pages/FastingPage/components/WellDone/components/ModalEditDate'
import { useGlobalStore } from '@/stores'
import smiles from '@/assets/images/fasting/smiles.webp'
import { clsx } from 'clsx'
import { FastingModel } from '@/components/pages/FastingPage/types/index.types'
import useGetLocaleForDate from '@/components/pages/FastingPage/hooks/useGetLocaleForDate'

// interface
interface IWellDoneProps {
  isOpen: boolean
  activeModel: FastingModel
  dateStartFastingInCard: Date
  onClose: () => void
}

// component
const WellDone: FC<Readonly<IWellDoneProps>> = ({
  isOpen,
  dateStartFastingInCard,
  onClose,
  activeModel,
}) => {
  const now = new Date()
  const { t } = useTranslation()
  const namesSmiles = [t('bad'), t('notGreat'), t('okEmotion'), t('good'), t('great')]
  const locale = useGetLocaleForDate()
  const completedFastings = useGlobalStore((state) => state.completedFastings)
  const handleChangeGlobalStore = useGlobalStore((state) => state.handleChangeGlobalStore)
  const dateStartFasting = useGlobalStore((state) => state.dateStartFasting)
  const [emotion, setEmotion] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(
    dateStartFasting ? differenceInSeconds(now, parseISO(dateStartFasting)) : 0,
  )
  const [typeEditDate, setTypeEditDate] = useState<null | 'start' | 'end'>(null)

  const [dateUpdatedStartFasting, setDateUpdatedStartFasting] = useState<Date | undefined>()
  const [dateUpdatedEndFasting, setDateUpdatedEndFasting] = useState<Date | undefined>()

  const onEndFasting = () => {
    const dateStart = dateUpdatedStartFasting?.toISOString() || dateStartFasting
    const dateEnd = dateUpdatedEndFasting || new Date()

    if (dateStart) {
      const diffSeconds = differenceInSeconds(dateEnd, parseISO(dateStart))
      const diffMinutes = differenceInMinutes(dateEnd, parseISO(dateStart))
      const progress =
        diffSeconds < activeModel.fastingDuration * 60 * 60
          ? Math.round(diffSeconds / ((activeModel.fastingDuration * 60 * 60) / 100))
          : 100
      const sameDay = completedFastings?.find((el) =>
        isSameDay(parseISO(el.dateStart), parseISO(dateStart)),
      )

      const newCompleteFasting = {
        fastingModel: activeModel,
        dateStart: sameDay ? sameDay.dateStart : dateStart,
        fastingMinutes: sameDay ? sameDay.fastingMinutes + diffMinutes : diffMinutes,
        progress: sameDay
          ? sameDay.progress + progress > 100
            ? 100
            : sameDay.progress + progress
          : progress,
      }
      handleChangeGlobalStore({
        dateStartFasting: null,
        completedFastings: completedFastings
          ? [...completedFastings, newCompleteFasting].filter((el) => el !== sameDay)
          : [newCompleteFasting],
      })

      setDateUpdatedStartFasting(undefined)
      setDateUpdatedEndFasting(undefined)
      onClose()
    }
  }

  useEffect(() => {
    const dateStart = dateUpdatedStartFasting?.toISOString() || dateStartFasting

    if (!dateStart) return

    const interval = setInterval(() => {
      const dateEnd = dateUpdatedEndFasting || new Date()
      const diff = differenceInSeconds(dateEnd, parseISO(dateStart))

      if (dateStartFasting) {
        setSecondsPassed(diff)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [dateStartFasting, dateUpdatedStartFasting, dateUpdatedEndFasting])

  // return
  return (
    <>
      <div
        className={`${isOpen ? 'translate-x-0' : 'translate-x-full'}  fixed top-0 right-0 h-full w-full z-40 bg-[#F8F8F8]  border border-gray transition-all duration-300 flex flex-col`}
      >
        <div className={' h-full max-w-content w-full mx-auto overflow-y-auto overflow-x-hidden'}>
          <div
            className={'grid justify-items-center pt-[73px] bg-[#13D16A] text-white w-full h-fit'}
          >
            <h2 className={'mb-[25px] leading-none font-semibold text-[36px] text-white'}>
              {t('wellDone')}
            </h2>

            <p className={'mb-[13px] font-medium'}>{t('fastingTime')}</p>

            <p className={'mb-[26px] font-bold text-xl3 '}>{formatSeconds(secondsPassed, true)}</p>

            <img src={Clock} alt="clock" className={'mb-[102px] w-[64px] h-[64px]'} />
          </div>

          <div
            className={
              'mx-4 mt-[-61px] mb-6 rounded-[14px] bg-white shadow-[0px_4px_17px_0px_#E6EAEB] '
            }
          >
            <div
              className={
                'grid gap-[5px] py-[18px] px-[23px] grid-cols-[1fr_auto_auto] items-center border-b border-[#E3E3E3]'
              }
            >
              <p className={'font-semibold text-base'}>{t('started')}</p>

              <p className={'font-medium text-md text-[#89939B]'}>
                {format(dateUpdatedStartFasting || dateStartFastingInCard, 'EEE, dd MMM, HH:mm', {
                  locale,
                })}
              </p>

              <button onClick={() => setTypeEditDate('start')}>
                <img src={PencilSvg} alt={'pencil'} />
              </button>
            </div>

            <div
              className={
                'grid gap-[5px] py-[18px] px-[23px] grid-cols-[1fr_auto_auto] items-center'
              }
            >
              <p className={'font-semibold text-base'}>{t('finished')}</p>

              <p className={'font-medium text-md text-[#89939B]'}>
                {format(dateUpdatedEndFasting || new Date(), 'EEE, dd MMM, HH:mm', {
                  locale,
                })}
              </p>

              <button onClick={() => setTypeEditDate('end')}>
                <img src={PencilSvg} alt={'pencil'} />
              </button>
            </div>
          </div>

          <div className={'px-4 mb-8'}>
            <h3 className={'mb-4 font-semibold text-xl2'}>{t('howAreYouFeeling')}</h3>

            <div
              className={'py-[21px] px-6 rounded-[14px] bg-white shadow-[0px_4px_17px_0px_#E6EAEB]'}
            >
              <img src={smiles} alt={'smiles'} className={'w-full px-[12px] mb-[2px]'} />

              <div className={'grid grid-cols-[1fr_1fr_1fr_1fr_1fr] w-full'}>
                {namesSmiles.map((nameSmile, key) => (
                  <button
                    onClick={() => setEmotion(emotion === nameSmile ? null : nameSmile)}
                    key={`${key}-${nameSmile}-name`}
                    className={clsx(
                      'p-[2px] text-center font-medium text-md text-[#89939B] rounded-full transition',
                      {
                        'bg-green text-white ': emotion === nameSmile,
                      },
                    )}
                  >
                    {nameSmile}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className={
              'grid grid-cols-[1fr_1fr] h-[53px] mx-4 border-green border rounded-full overflow-hidden'
            }
          >
            <button className={'w-full h-full text-green font-bold text-center'} onClick={onClose}>
              {t('keepFast')}
            </button>

            <button
              className={'w-full h-full text-white bg-green font-bold text-center'}
              onClick={onEndFasting}
            >
              {t('endFast')}
            </button>
          </div>
        </div>
      </div>

      {typeEditDate && (
        <ModalEditDate
          typeEditDate={typeEditDate}
          onClose={() => setTypeEditDate(null)}
          dateStartFasting={dateUpdatedStartFasting || dateStartFastingInCard}
          dateEndFasting={dateUpdatedEndFasting || new Date()}
          locale={locale}
          setDateUpdatedStartFasting={setDateUpdatedStartFasting}
          setDateUpdatedEndFasting={setDateUpdatedEndFasting}
        />
      )}
    </>
  )
}

export default WellDone
