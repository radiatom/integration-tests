import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useGetUserChallengeAvailable from '@/hooks/useGetUserChallengeAvailable'
import { ChallengeInfo } from '@/types/interfaces'
import { motion, AnimatePresence, cubicBezier } from 'framer-motion'
import TinderCards from '@/components/pages/DiscoverChallenges/components/TinderCards/TinderCards'
import EmptyDiscoverChallenges from '@/components/pages/DiscoverChallenges/components/EmptyDiscoverChallenges'
import { useTranslation } from 'react-i18next'
import arrowBackSvg from '@/assets/images/svg/arrow-back-thin.svg'
import { clsx } from 'clsx'
import { ROUTES } from '@/constants/routes'

// interface
interface IDiscoverChallengesPageProps {}

// component
const DiscoverChallengesPage: FC<Readonly<IDiscoverChallengesPageProps>> = () => {
  const { t } = useTranslation()
  const [cards, setCards] = useState<undefined | ChallengeInfo[] | []>()

  const { data: challenges, isLoading } = useGetUserChallengeAvailable()

  const gameScreenVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: { duration: 2, ease: cubicBezier(0.16, 1, 0.3, 1) },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: cubicBezier(0.7, 0, 0.84, 0) },
    },
  }

  useEffect(() => {
    if (challenges) {
      setCards(challenges.slice().reverse())
    }
  }, [challenges])

  // return
  return (
    <div className={'max-w-content w-full mx-auto'}>
      <div
        className={'w-full sticky top-0  left-0 -mt-4 p-4  pb-4 z-20 transition-all translate-y-0'}
      >
        <div className="w-full">
          <div className="flex justify-center items-center relative  min-h-[40px]">
            <Link
              to={ROUTES.CHALLENGES}
              className={
                'opacity-100 visible   cursor-pointer absolute top-1/2 left-0 -translate-y-1/2 transition-all duration-300 active:scale-95'
              }
            >
              <div
                className={clsx(
                  'flex items-center justify-center w-10 h-10 rounded-full border border-backButtonBorder hover:opacity-70 transition-all duration-300',
                  {
                    'bg-[#00000008]': !cards || cards.length === 0,
                  },
                )}
              >
                <img width={24} height={24} src={arrowBackSvg} alt="arrow-back" />
              </div>
            </Link>

            <h3
              className={clsx(
                'opacity-100 visible font-medium text-center font-outfit transition-all duration-300 text-base',
                {
                  'text-white': !cards || cards.length === 0,
                },
              )}
            >
              {t('discoverChallenges')}
            </h3>
          </div>
        </div>
      </div>

      {!isLoading && (
        <div className={'overflow-y-auto overflow-x-hidden'}>
          <AnimatePresence mode="wait">
            {cards && cards.length !== 0 ? (
              <div className={'pt-8'}>
                <TinderCards cards={cards as ChallengeInfo[]} setCards={setCards} />

                <p className={'font-medium text-center'}>{t('acceptThisChallenge')}</p>
              </div>
            ) : (
              <motion.div
                key="gameScreen2"
                id="gameCompletion"
                variants={gameScreenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <EmptyDiscoverChallenges />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default DiscoverChallengesPage
