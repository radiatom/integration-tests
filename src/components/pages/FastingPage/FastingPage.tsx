import React, { useEffect, useMemo, useState } from 'react'
import Layout from '@/components/Layout'
import { useTranslation } from 'react-i18next'
import PencilSvg from '@/assets/images/fasting/pencil.svg'
import InfoSvg from '@/assets/images/fasting/info-model.svg'
import Models from '@/components/pages/FastingPage/components/Models'
import InfoModel from '@/components/pages/FastingPage/components/InfoModel'
import SuccessChangeModel from '@/components/pages/FastingPage/components/SuccessChangeModel'
import { useGlobalStore } from '@/stores'
import { Button } from '@/components/Button/Button'

import StageCard from '@/components/pages/FastingPage/components/StageCard'
import { addHours, differenceInSeconds, format, parseISO } from 'date-fns'
import WellDone from '@/components/pages/FastingPage/components/WellDone/WellDone'
import BodyStatus from '@/components/pages/FastingPage/components/BodyStatus'
import WeeksFasting from '@/components/pages/FastingPage/components/WeeksFasting'
import useGetModelsData from '@/components/pages/FastingPage/hooks/useGetModelsData'
import { FastingModel, Stage } from '@/components/pages/FastingPage/types/index.types'
import { nameModelStore } from '@/components/pages/FastingPage/config'
import useGetDefaultStage from '@/components/pages/FastingPage/hooks/useGetDefaultStage'
import { getCurrentStage } from '@/components/pages/FastingPage/helpers'
import CircularFastingProgress from '@/components/pages/FastingPage/components/CircularFastingProgress/CircularFastingProgress'
import arrowBackSvg from '@/assets/images/svg/arrow-back-thin.svg'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

// page
const FastingPage = () => {
  const now = new Date()
  const { t } = useTranslation()
  const modelsData = useGetModelsData()
  const defaultStage = useGetDefaultStage()
  const dateStartFasting = useGlobalStore((state) => state.dateStartFasting)
  const handleChangeGlobalStore = useGlobalStore((state) => state.handleChangeGlobalStore)
  const [isOpenModels, setIsOpenModels] = useState(false)
  const [isOpenInfoModel, setIsOpenInfoModel] = useState(false)
  const [isOpenSuccessChangeModel, setIsOpenSuccessChangeModel] = useState(false)
  const [isOpenWellDone, setIsOpenWellDone] = useState(false)
  const [isOpenBodyStatus, setIsOpenBodyStatus] = useState(false)
  const [activeModel, setActiveModel] = useState<FastingModel>(
    modelsData
      .flatMap((el) => el.models)
      .find((el) => el.id === localStorage.getItem(nameModelStore)) || modelsData[0].models[0],
  )
  const [activeStage, setActiveStage] = useState<Stage>(
    dateStartFasting
      ? getCurrentStage(activeModel.stages, differenceInSeconds(now, parseISO(dateStartFasting)))
      : defaultStage,
  )
  const dateStartFastingInCard = useMemo(
    () => (dateStartFasting ? parseISO(dateStartFasting) : now),
    [dateStartFasting],
  )
  const dateEndFasting = useMemo(
    () =>
      addHours(dateStartFasting ? parseISO(dateStartFasting) : now, activeModel.fastingDuration),
    [dateStartFasting, activeModel],
  )

  const setModel = (model: FastingModel) => {
    setActiveModel(model)
    localStorage.setItem(nameModelStore, model.id)
    setIsOpenSuccessChangeModel(true)
  }

  useEffect(() => {
    if (!isOpenSuccessChangeModel) return

    const timeout = setTimeout(() => {
      setIsOpenSuccessChangeModel(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isOpenSuccessChangeModel])

  // return
  return (
    <>
      <Layout>
        <div className="overflow-y-auto min-h-full overflow-x-hidden pb-[70px] bg-white">
          <div className={'bg-[#F8F8F8] rounded-[0_0_32px_32px] px-[17px] pb-6'}>
            <div
              className={
                'grid  grid-cols-[auto_1fr_auto_auto] gap-[11px] bg-[#F8F8F8] items-center sticky top-0 left-0 z-10'
              }
            >
              <Link
                className={'cursor-pointer  transition-all duration-300 active:scale-95'}
                to={ROUTES.PLAN}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-backButtonBorder hover:opacity-70 transition-all duration-300">
                  <img width={24} height={24} src={arrowBackSvg} alt="arrow-back" />
                </div>
              </Link>

              <h3 className={'text-xl4 font-semibold text-dark py-[14px] '}>{t('fasting')}</h3>

              <button
                className={
                  'grid grid-cols-[auto_auto] gap-[2px] items-center py-[9px] px-[10px] border leading-none border-[#7F7E8933] rounded-[29px] text-black text-md font-medium active:scale-95'
                }
                onClick={() => setIsOpenModels(true)}
              >
                <span>
                  {activeModel?.fastingDuration}:{activeModel?.eatingDuration}
                </span>

                <img src={PencilSvg} alt="Pencil" />
              </button>

              <button onClick={() => setIsOpenInfoModel(true)}>
                <img src={InfoSvg} alt="info" />
              </button>
            </div>

            <div className={'grid gap-2  justify-items-center'}>
              <CircularFastingProgress
                setActiveStage={setActiveStage}
                stages={activeModel.stages}
                activeModel={activeModel}
                defaultStage={defaultStage}
                dateStartFastingInCard={dateStartFastingInCard}
              />

              <div className={'grid w-full grid-cols-[1fr_auto] px-1'}>
                <div className={'grid gap-[2px]'}>
                  <p className={'font-medium text-xs text-[#89939B]'}>
                    {t('start')}, {format(dateStartFastingInCard, 'MMM dd')}
                  </p>

                  <p className={'font-bold text-base'}>
                    {format(dateStartFastingInCard, 'hh:mm aaa')}
                  </p>
                </div>

                <div className={'grid gap-[2px] justify-items-end'}>
                  <p className={'font-medium text-xs text-[#89939B]'}>
                    {t('goal')} , {format(dateEndFasting, 'MMM dd')}
                  </p>

                  <p className={'font-bold text-base'}>{format(dateEndFasting, 'hh:mm aaa')}</p>
                </div>
              </div>

              <Button
                onClick={() =>
                  dateStartFasting
                    ? setIsOpenWellDone(true)
                    : handleChangeGlobalStore({ dateStartFasting: new Date().toISOString() })
                }
                className={'h-[60px]'}
                variant={dateStartFasting ? 'outline-green' : 'default'}
              >
                {dateStartFasting ? t('endFasting') : t('startFasting')}
              </Button>
            </div>
          </div>

          <StageCard
            stage={activeStage}
            onReadMore={activeStage.id !== 0 ? () => setIsOpenBodyStatus(true) : undefined}
          />

          <WeeksFasting />
        </div>
      </Layout>

      <Models
        isOpen={isOpenModels}
        onClose={() => setIsOpenModels(false)}
        activeModel={activeModel}
        setModel={setModel}
        modelsData={modelsData}
      />

      <InfoModel
        isOpen={isOpenInfoModel}
        onClose={() => setIsOpenInfoModel(false)}
        activeModel={activeModel}
      />

      <SuccessChangeModel model={activeModel} isOpen={isOpenSuccessChangeModel} />

      <WellDone
        isOpen={isOpenWellDone}
        dateStartFastingInCard={dateStartFastingInCard}
        activeModel={activeModel}
        onClose={() => setIsOpenWellDone(false)}
      />

      <BodyStatus
        isOpen={isOpenBodyStatus}
        onClose={() => setIsOpenBodyStatus(false)}
        activeStage={activeStage}
        activeModel={activeModel}
      />
    </>
  )
}

export default FastingPage
