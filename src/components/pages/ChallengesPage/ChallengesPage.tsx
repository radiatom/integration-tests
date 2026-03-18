import React, { FC } from 'react'
import Layout from '@/components/Layout'
import { Link } from 'react-router-dom'
import arrowBack from '@/assets/images/svg/arrow-back-thin.svg'
import trophy from '@/assets/images/challenges/trophy.svg'
import { ROUTES } from '@/constants/routes'
import { clsx } from 'clsx'
import DiscoverModal from '@/components/DiscoverModal/DiscoverModal'
import CurrentStreak from '@/components/pages/ChallengesPage/components/CurrentStreak'
import emptyChallengesImg from '@/assets/images/challenges/empty-challenges.webp'
import { useTranslation } from 'react-i18next'
import useGetUserChallengeTrophies from '@/hooks/useGetUserChallengeTrophies'
import useGetUserChallengeStreaks from '@/hooks/useGetUserChallengeStreaks'
import useGetUserChallengeActive from '@/hooks/useGetUserChallengeActive'
import useGetUserChallengeFinished from '@/hooks/useGetUserChallengeFinished'
import { typeFinishedChallengesEnum } from '@/types/interfaces'
import CompletedChallenges from '@/components/pages/ChallengesPage/components/CompletedChallenges/CompletedChallenges'
import ActiveChallenges from '@/components/pages/ChallengesPage/components/ActiveChallenges/ActiveChallenges'

// interface
interface IChallengesPageProps {}

// component
const ChallengesPage: FC<Readonly<IChallengesPageProps>> = () => {
  const { t } = useTranslation()

  const { data: trophies } = useGetUserChallengeTrophies()
  const { data: streaks } = useGetUserChallengeStreaks()
  const { data: challengesActive } = useGetUserChallengeActive()
  const { data: challengesFinished } = useGetUserChallengeFinished(typeFinishedChallengesEnum.All)
  const { data: challengesFinishedSuccessful } = useGetUserChallengeFinished(
    typeFinishedChallengesEnum.Successful,
  )
  const { data: challengesFinishedPartial } = useGetUserChallengeFinished(
    typeFinishedChallengesEnum.Partial,
  )

  // return
  return (
    <>
      <Layout>
        <div className={'overflow-y-auto min-h-full overflow-x-hidden pb-[90px]'}>
          <div
            className={
              'grid items-center gap-3 grid-cols-[auto_1fr_auto] pt-3 pb-5 px-4 shadow-header sticky top-0 left-0 bg-white z-20'
            }
          >
            <Link
              className={'cursor-pointer  transition-all duration-300 active:scale-95'}
              to={ROUTES.PLAN}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-backButtonBorder hover:opacity-70 transition-all duration-300">
                <img width={24} height={24} src={arrowBack} alt="arrow-back" />
              </div>
            </Link>

            <h3 className={'text-xl4 font-semibold text-dark '}>{t('challenges')}</h3>

            <Link
              to={ROUTES.CHALLENGES + ROUTES.TROPHIES}
              className={
                'grid items-center gap-[3px] grid-cols-[auto_1fr] w-fit py-[6px] px-2 rounded-full bg-[#00000008]'
              }
            >
              <div className={'relative'}>
                <img src={trophy} alt={''} />

                <div
                  className={
                    'absolute top-[3px] left-1/2 -translate-x-1/2 w-[23px] h-[19px]  overflow-hidden'
                  }
                >
                  <div className="absolute -top-1/2 left-3/4 w-3/4 h-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shine" />
                </div>
              </div>

              {trophies && (
                <p
                  className={clsx(
                    'grid items-center justify-items-center min-w-[19px] h-[19px]  rounded-full px-[2.5px]',
                    { 'bg-[#0000003D]': trophies.length === 0 },
                    { 'bg-green': trophies.length > 0 },
                  )}
                >
                  <span className={'text-white text-xs3 leading-none'}>{trophies.length}</span>
                </p>
              )}
            </Link>
          </div>

          <div className={'grid gap-4 py-3 px-4 relative grid-cols-[minmax(300px,100vw)]'}>
            {streaks && <CurrentStreak countStreakPoints={streaks.totalStreakPoints} />}

            {challengesActive?.length === 0 && challengesFinished?.length === 0 ? (
              <img src={emptyChallengesImg} alt={'empty'} className={'mt-[35px]'} />
            ) : (
              <>
                {challengesActive && challengesActive.length !== 0 && (
                  <ActiveChallenges challengesData={challengesActive} />
                )}

                {challengesFinished && challengesFinished.length !== 0 && (
                  <CompletedChallenges
                    challengesActive={challengesActive}
                    challengesAllData={challengesFinished}
                    challengesFinishedSuccessful={challengesFinishedSuccessful}
                    challengesFinishedPartial={challengesFinishedPartial}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Layout>

      <DiscoverModal
        withTitle={challengesActive?.length === 0 && challengesFinished?.length === 0}
        isEmpty={false}
      />
    </>
  )
}

export default ChallengesPage
