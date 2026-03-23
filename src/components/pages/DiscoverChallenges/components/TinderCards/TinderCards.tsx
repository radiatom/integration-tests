import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { ChallengeInfo } from '@/types/interfaces'
import {
  easeIn,
  easeInL,
  easeOutExpo,
  initialDrivenProps,
} from '@/components/pages/DiscoverChallenges/components/TinderCards/config/easings.data'

import GameActionBtn from '@/components/pages/DiscoverChallenges/components/TinderCards/components/GameActionBtn'
import {
  CardSwipeDirection,
  IsDragOffBoundary,
} from '@/components/pages/DiscoverChallenges/types/cards.types'
import TinderCard from '@/components/pages/DiscoverChallenges/components/TinderCards/components/TinderCard/TinderCard'
import useAcceptChallengeMutation from '@/hooks/useAcceptChallengeMutation'

interface IGameCardsProps {
  cards: ChallengeInfo[]
  setCards: Dispatch<SetStateAction<ChallengeInfo[]>>
}

const TinderCards: FC<Readonly<IGameCardsProps>> = ({ setCards, cards }) => {
  const { mutate: acceptChallengeMutation } = useAcceptChallengeMutation()
  const [direction, setDirection] = useState<CardSwipeDirection | ''>('')
  const [draggingId, setDraggingId] = useState<null | string>(null)
  const [isDragOffBoundary, setIsDragOffBoundary] = useState<IsDragOffBoundary>(null)
  const [cardDrivenProps, setCardDrivenProps] = useState(initialDrivenProps)
  const [isShowHandsSvg, setIsShowHandsSvg] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const [ease, setEase] = useState(easeInL)

  const onAccept = async (id: string) => {
    await acceptChallengeMutation(id)
  }

  const handleActionBtnOnClick = (btn: CardSwipeDirection) => {
    const lastCard = cards[cards.length - 1]
    if (!lastCard) return
    setDraggingId(lastCard._id)
    setEase(easeInL)

    if (btn === 'right') {
      onAccept(lastCard._id)
      setIsShowHandsSvg(true)

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      const id = setTimeout(() => {
        setDirection(btn)
        setTimeoutId(null)
      }, 1000)

      setTimeoutId(id)
    } else {
      setDirection(btn)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  useEffect(() => {
    if (direction === 'left' || direction === 'right') {
      setCards((prev) => prev.slice(0, -1))
      setDraggingId(null)
      setDirection('')
    } else {
      setIsShowHandsSvg(false)
      setEase(easeIn)
    }
  }, [direction])

  const cardVariants = {
    current: {
      y: 0,
      scale: 1,
      transition: { duration: 1.2, ease: easeOutExpo },
    },
    upcoming: {
      y: -13,
      scale: 0.95,
      transition: { duration: 0, ease: easeOutExpo },
    },
    secondUpcoming: {
      y: -26,
      scale: 0.9,
      transition: { duration: 0, ease: easeOutExpo },
    },
    hidden: {
      opacity: 0,
      y: -26,
      scale: 0.9,
      transition: { duration: 0, ease: easeOutExpo },
    },
    exit: {
      x: direction === 'left' ? -750 : 750,
      y: 10,
      rotate: direction === 'left' ? -30 : 30,
      transition: { duration: 1.2, ease },
    },
  }

  return (
    <motion.div className={'flex mb-4 h-full flex-col  items-center '}>
      <div
        id="gameUIWrapper"
        className=" px-4 bg-[#F9FAFB] max-w-[450px] w-full items-center justify-center relative z-10"
      >
        <div id="cardsWrapper" className="w-full aspect-[179/270]  relative z-10">
          <AnimatePresence>
            {cards.map((challenge, i) => {
              const isLast = i === cards.length - 1
              const isSecondLast = i === cards.length - 2
              const isThirdLast = i === cards.length - 3
              return (
                <motion.div
                  key={`card-${i}`}
                  id={`card-${challenge._id}`}
                  className={'relative '}
                  variants={cardVariants}
                  animate={
                    isLast
                      ? 'current'
                      : isSecondLast
                        ? 'upcoming'
                        : isThirdLast
                          ? 'secondUpcoming'
                          : 'hidden'
                  }
                  exit="exit"
                >
                  <TinderCard
                    id={challenge._id}
                    isFirstCard={i === 0}
                    onAccept={onAccept}
                    draggingId={draggingId}
                    setDraggingId={setDraggingId}
                    challenge={challenge}
                    setCardDrivenProps={setCardDrivenProps}
                    cardDrivenProps={cardDrivenProps}
                    setIsDragOffBoundary={setIsDragOffBoundary}
                    isDragOffBoundary={isDragOffBoundary}
                    setDirection={setDirection}
                    direction={direction}
                    isShowHandsSvg={isShowHandsSvg}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <div
          id="actions"
          className="flex items-center justify-center w-full  gap-4 relative z-10 mt-[-50px]"
        >
          <GameActionBtn
            direction="left"
            ariaLabel="swipe left"
            scale={cardDrivenProps.buttonScaleBadAnswer}
            translateX={cardDrivenProps.translateX}
            isDragOffBoundary={isDragOffBoundary}
            onClick={() => handleActionBtnOnClick('left')}
          />
          <GameActionBtn
            direction="right"
            ariaLabel="swipe right"
            scale={cardDrivenProps.buttonScaleGoodAnswer}
            translateX={cardDrivenProps.translateX}
            isDragOffBoundary={isDragOffBoundary}
            onClick={() => handleActionBtnOnClick('right')}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default TinderCards
