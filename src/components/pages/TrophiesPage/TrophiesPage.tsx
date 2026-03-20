import React, { FC } from 'react'
import Layout from '@/components/Layout'
import { useNavigate } from 'react-router-dom'
import arrowBackSvg from '@/assets/images/svg/arrow-back-thin.svg'
import trophyEmpty from '@/assets/images/challenges/trophy-empty.webp'
import DiscoverModal from '@/components/DiscoverModal/DiscoverModal'
import { useTranslation } from 'react-i18next'
import TrophieCard from '@/components/pages/TrophiesPage/components/TrophieCard/TrophieCard'
import useGetUserChallengeAvailable from '@/hooks/useGetUserChallengeAvailable'
import useGetUserChallengeTrophies from '@/hooks/useGetUserChallengeTrophies'
import ImageComponent from '@/components/ImageComponent/ImageComponent'

// interface
interface ITrophiesPageProps {}

// component
const TrophiesPage: FC<Readonly<ITrophiesPageProps>> = () => {
  const navigate = useNavigate()
  const { data: trophies, isLoading: isLoadingTrophies } = useGetUserChallengeTrophies()
  const { data: challenges, isLoading } = useGetUserChallengeAvailable()
  const { t } = useTranslation()

  // return
  return !isLoading || !isLoadingTrophies ? (
    <>
      <Layout>
        <div className={'overflow-y-auto min-h-full overflow-x-hidden pb-[70px]'}>
          <div
            className={
              'grid items-center gap-3 grid-cols-[auto_1fr] pt-3 pb-5 px-4 shadow-header sticky top-0 left-0 bg-white z-10'
            }
          >
            <div
              className={'cursor-pointer  transition-all duration-300 active:scale-95'}
              onClick={() => navigate(-1)}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-backButtonBorder hover:opacity-70 transition-all duration-300">
                <img width={24} height={24} src={arrowBackSvg} alt="arrow-back" />
              </div>
            </div>

            <h3 className={'text-xl4 font-semibold text-dark '}>{t('trophies')}</h3>
          </div>

          {trophies && trophies.length !== 0 ? (
            <div
              className={'grid grid-cols-[1fr_1fr_1fr] py-6 px-4 gap-y-3'}
              data-testid={'trophies-list'}
            >
              {trophies.map((tr, key) => (
                <TrophieCard key={`${key}_${tr}`} trophie={tr} />
              ))}
            </div>
          ) : (
            <div className={'grid justify-items-center'}>
              <ImageComponent
                src={trophyEmpty}
                alt="trophy"
                className={'fixed bottom-[223px] max-w-[323px]'}
              />
            </div>
          )}
        </div>
      </Layout>

      <DiscoverModal
        withTitle={!trophies || trophies.length === 0}
        isEmpty={!challenges || challenges.length === 0}
      />
    </>
  ) : null
}

export default TrophiesPage
