import React, { FC, Fragment, useMemo } from 'react'
import useMeal from '@/hooks/useMeal'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '@/components/Layout'
import { Loader } from '@/components/Loader/Loader'
import { IconSVG } from '@/components/IconSvg/IconSvg'
import ImageComponent from '@/components/ImageComponent/ImageComponent'

// interface
interface IMealPageProps {}

// component
const MealPage: FC<Readonly<IMealPageProps>> = () => {
  const { t } = useTranslation()
  const { idMeal } = useParams()
  const navigate = useNavigate()

  const { data: mealData, isLoading } = useMeal(idMeal)

  const metricType = mealData?.page.ingredients[0].metricType

  const steps = useMemo(
    () =>
      mealData?.page.description
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((step) => step.replace(/^\s*\d+\.\s*/, '')),
    [mealData?.page.description],
  )

  // return
  return (
    <Layout>
      {isLoading ? (
        <div className={'p-4'}>
          <Loader />
        </div>
      ) : (
        <div className={'grid  h-full overflow-y-auto overflow-x-hidden'}>
          <div
            className="absolute top-4 left-4    flex items-center justify-center w-[48px] h-[48px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#0000003D] z-20"
            onClick={() => navigate(-1)}
          >
            <IconSVG type={'ARROW_BACK'} height={24} width={24} fill={'red'} stroke={'white'} />
          </div>

          <div className={'relative w-full h-[457px] '}>
            <ImageComponent src={mealData?.page.cover} alt={`${mealData?.page.name} img`} />

            <div className={'bg-black opacity-20 absolute top-0 left-0 w-full h-full'} />

            <div className={'absolute bottom-[56px] left-5 max-w-[241px] '}>
              <div className={' flex gap-8 items-center  font-semibold text-md mb-3 text-white'}>
                <p className={'grid grid-cols-[auto_auto] gap-[6px] items-center'}>
                  <IconSVG type={'KCAL'} stroke={'white'} />
                  <span>{mealData?.page.kCal} Kcal</span>
                </p>

                <p className={'grid grid-cols-[auto_auto] gap-[6px] items-center'}>
                  <IconSVG type={'CLOCK'} fill={'white'} />

                  <span>{mealData?.page.cookTime}</span>
                </p>
              </div>

              <h1 className={'font-semibold text-xl4 text-white'}>{mealData?.page.name}</h1>
            </div>
          </div>

          <div className={'mt-[-40px] rounded-[32px_32px_0_0] bg-[#F9FAFB] p-4 z-10'}>
            <div className={'grid grid-cols-[1fr_1fr_1fr] gap-[6px]'}>
              <div
                className={
                  'grid items-center justify-items-center h-[104px] w-full rounded-r16 bg-white '
                }
              >
                <div className={'grid justify-items-center h-fit'}>
                  <p className={'font-semibold text-xl2 text-dark'}>
                    {metricType ? mealData?.page.proteins[metricType] : ''}
                    {metricType ? metricType[0] : ''}
                  </p>
                  <p className={'text-gray9 font-medium text-xs capitalize'}>{t('protein')}</p>
                </div>
              </div>

              <div
                className={
                  'grid items-center justify-items-center h-[104px] w-full rounded-r16 bg-white '
                }
              >
                <div className={'grid justify-items-center h-fit'}>
                  <p className={'font-semibold text-xl2 text-dark'}>
                    {metricType ? mealData?.page.carbs[metricType] : ''}
                    {metricType ? metricType[0] : ''}
                  </p>
                  <p className={'text-gray9 font-medium text-xs capitalize'}>{t('carbs')}</p>
                </div>
              </div>

              <div
                className={
                  'grid items-center justify-items-center h-[104px] w-full rounded-r16 bg-white mb-4'
                }
              >
                <div className={'grid justify-items-center h-fit'}>
                  <p className={'font-semibold text-xl2 text-dark'}>
                    {metricType ? mealData?.page.fat[metricType] : ''}
                    {metricType ? metricType[0] : ''}
                  </p>
                  <p className={'text-gray9 font-medium text-xs capitalize'}>{t('fat')}</p>
                </div>
              </div>
            </div>

            <p className={'text-md text-secondary mb-[6px] capitalize'}>{t('ingredients')}</p>

            <div className={'grid gap-3 rounded-r24 bg-white p-3 mb-6'}>
              {mealData?.page.ingredients.map((ing, key) => (
                <Fragment key={`${key}-${ing.name}`}>
                  <div
                    className={'grid grid-cols-[1fr_auto] py-[5px] px-[8px] font-medium text-base '}
                  >
                    <p className={'text-dark'}>{ing.name}</p>

                    <p className={'text-secondary'}>
                      {ing.weight}
                      {metricType ? (ing.weight ? metricType[0] : '') : ''}
                    </p>
                  </div>

                  {key + 1 !== mealData.page.ingredients.length && (
                    <div className={'w-full h-px bg-[#B7BABE] '} />
                  )}
                </Fragment>
              ))}
            </div>

            <h3 className={'font-medium text-base text-dark mb-1 pl-2 '}>{t('howToCook')}</h3>

            <ol className="list-decimal  space-y-3 pl-[25px] text-secondary">
              {steps?.map((step, index) => (
                <li key={index} className="text-md leading-relaxed !mt-0">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default MealPage
