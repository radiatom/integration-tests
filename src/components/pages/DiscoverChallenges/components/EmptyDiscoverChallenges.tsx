import React from 'react'
import { motion } from 'framer-motion'
import Fireworks from '@/components/Fireworks/Fireworks'
import DiscoverModal from '@/components/DiscoverModal/DiscoverModal'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import emptySvg from '@/assets/images/challenges/hand-empty-discover-challenges.svg'
import { useTranslation } from 'react-i18next'

const EmptyDiscoverChallenges = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <>
      <div
        className={'flex p-5 min-h-screen h-full flex-col items-center justify-center  bg-white '}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { ease: 'backOut', duration: 0.2, delay: 0.15 },
          }}
          className="grid items-center justify-items-center fixed top-0 left-0 w-full min-h-full p-4 z-0"
        >
          <Fireworks />

          <div
            className={'grid gap-2 max-w-[305px]  justify-items-center text-center text-white z-10'}
          >
            <img src={emptySvg} alt={'empty discover'} className={'w-[104px] h-[104px]'} />

            <h3 className={'text-xl6 font-semibold'}>{t('youreDoneIt')}</h3>

            <p className={'font-medium text-xl'}>{t('noMoreChallengesMessage')}</p>
          </div>
        </motion.div>
      </div>

      <DiscoverModal isEmpty={true} onHome={() => navigate(ROUTES.CHALLENGES)} />
    </>
  )
}

export default EmptyDiscoverChallenges
