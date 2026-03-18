import React from 'react'

import { motion } from 'framer-motion'
import SvgIconAnswerBad from '@/assets/images/challenges/icon-answer-bad.svg'
import SvgIconAnswerGood from '@/assets/images/challenges/icon-answer-good.svg'
import { IsDragOffBoundary } from '@/components/pages/DiscoverChallenges/types/cards.type'

const actionPropsMatrix = {
  left: {
    ariaLabel: 'Swipe Left',
    bgColorClass:
      'bg-[linear-gradient(180deg,#F99494_0%,#FF5858_100%)] shadow-[0px_9px_21px_0px_#D74D5B0F,0px_18px_36px_0px_#EC6E7B0D]',
    icon: SvgIconAnswerBad,
  },
  right: {
    ariaLabel: 'Swipe Right',
    bgColorClass:
      'bg-[linear-gradient(180deg,#24E57C_0%,#13D16A_100%)] shadow-[0px_7.5px_15px_0px_#7AEC6E29,0px_15px_37.5px_0px_#7AEC6E42]',
    icon: SvgIconAnswerGood,
  },
}

type Props = {
  ariaLabel: string
  scale: number
  translateX: number
  direction: 'left' | 'right'
  isDragOffBoundary: IsDragOffBoundary
  onClick: () => void
}

const GameActionBtn = ({
  scale,
  translateX,
  direction,
  isDragOffBoundary = null,
  onClick,
}: Props) => {
  return (
    <motion.button onClick={onClick} whileTap={{ scale: 0.9 }}>
      <motion.div
        className={`flex items-center justify-center w-[96px] h-[96px] rounded-full transition-opacity ${actionPropsMatrix[direction].bgColorClass} ${
          isDragOffBoundary != null && isDragOffBoundary !== direction && 'opacity-0'
        }`}
        style={{ scale, x: translateX }}
      >
        <img
          alt={''}
          src={actionPropsMatrix[direction!].icon}
          className={'w-[36px] h-[36px] duration-100 ease-out text-white'}
        />
      </motion.div>
    </motion.button>
  )
}

export default GameActionBtn
