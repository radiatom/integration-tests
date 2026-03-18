import React, { Dispatch, SetStateAction } from 'react'

import { motion, useMotionValue, useTransform, useMotionValueEvent } from 'framer-motion'
import {
  CardSwipeDirection,
  IsDragOffBoundary,
} from '@/components/pages/DiscoverChallenges/types/cards.type'
import { ChallengeInfo } from '@/types/interfaces'
import MilestoneCard from '@/components/pages/ChallengePage/components/MilestoneCard'
import {
  colors,
  offsetBoundary,
  outputActionScaleBadAnswer,
  outputActionScaleRightAnswer,
  outputRotate,
  outputX,
  outputY,
  translationsImg,
} from '@/components/pages/DiscoverChallenges/components/TinderCards/components/TinderCard/config'
import { useTranslation } from 'react-i18next'
import { formatDayCount } from '@/helpers/formatDayCount'
import { formatMilestoneCount } from '@/helpers/formatMilestoneCount'
import ImageComponent from '@/components/ImageComponent/ImageComponent'

type Props = {
  id: string
  isFirstCard: boolean
  onAccept: (id: string) => void
  challenge: ChallengeInfo
  setCardDrivenProps: Dispatch<SetStateAction<any>>
  draggingId: null | string
  setDraggingId: Dispatch<SetStateAction<null | string>>
  cardDrivenProps: {
    cardWrapperX: number
    buttonScaleBadAnswer: number
    buttonScaleGoodAnswer: number
    mainBgColor: string
  }
  setIsDragOffBoundary: Dispatch<SetStateAction<IsDragOffBoundary>>
  isDragOffBoundary: IsDragOffBoundary
  setDirection: Dispatch<SetStateAction<any>>
  direction: CardSwipeDirection | ''
  isShowHandsSvg: boolean
}

const TinderCard = ({
  id,
  isFirstCard,
  onAccept,
  challenge,
  draggingId,
  setDraggingId,
  setCardDrivenProps,
  cardDrivenProps,
  setIsDragOffBoundary,
  isDragOffBoundary,
  setDirection,
  direction,
  isShowHandsSvg,
}: Props) => {
  const { i18n } = useTranslation()
  const currentLocale = i18n.language

  const x = useMotionValue(0)
  const inputX = [offsetBoundary * -1, 0, offsetBoundary]
  const outputMainBgColor = [colors.left, colors.neutral, colors.right]

  const drivenX = useTransform(x, inputX, outputX)
  const drivenY = useTransform(x, inputX, outputY)
  const drivenRotation = useTransform(x, inputX, outputRotate)
  const drivenActionLeftScale = useTransform(x, inputX, outputActionScaleBadAnswer)
  const drivenActionRightScale = useTransform(x, inputX, outputActionScaleRightAnswer)
  const drivenBg = useTransform(x, [-20, 0, 20], outputMainBgColor)

  useMotionValueEvent(x, 'change', (latest) => {
    setCardDrivenProps((state) => ({
      ...state,
      cardWrapperX: latest,
      translateX: -latest,
      buttonScaleBadAnswer: drivenActionLeftScale,
      buttonScaleGoodAnswer: drivenActionRightScale,
      mainBgColor: drivenBg,
    }))
  })
  return (
    <motion.div
      id={`cardDrivenWrapper-${id}`}
      className={
        'absolute  rounded-r24 border-4  w-full aspect-[179/270] bg-white  select-none shadow-md overflow-hidden'
      }
      style={{
        y: drivenY,
        rotate: drivenRotation,
        x,
        translateX: drivenX,
        borderColor:
          draggingId === id
            ? direction
              ? direction === 'left'
                ? colors.left
                : colors.right
              : cardDrivenProps.mainBgColor
            : colors.neutral,
      }}
      drag="x"
      dragDirectionLock
      dragElastic={0.15}
      dragConstraints={{ left: 0, right: 0 }}
      dragTransition={{ bounceStiffness: 200, bounceDamping: 50 }}
      onDragStart={() => setDraggingId(id)}
      onDrag={(_, info) => {
        const offset = info.offset.x
        if (offset < 0 && offset < offsetBoundary * -1) {
          setIsDragOffBoundary('left')
        } else if (offset > 0 && offset > offsetBoundary) {
          setIsDragOffBoundary('right')
        } else {
          setIsDragOffBoundary(null)
        }
      }}
      onDragEnd={(_, info) => {
        setDraggingId(null)
        setIsDragOffBoundary(null)
        const isOffBoundary = info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary
        const direction = info.offset.x > 0 ? 'right' : 'left'

        if (isOffBoundary && direction === 'right') {
          onAccept(id)
        }

        if (isOffBoundary) {
          setDirection(direction)
        }
      }}
    >
      <ImageComponent
        src={challenge.image}
        loading={isFirstCard ? 'eager' : 'lazy'}
        fetchPriority={isFirstCard ? 'high' : 'low'}
        className={'w-full h-full object-cover'}
      />

      <div
        className={`absolute w-[306px] h-[346px]  object-cover z-[11]   pointer-events-none opacity-0 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[top,opacity] ease-out duration-700 ${
          ((isShowHandsSvg && draggingId === id) ||
            direction === 'right' ||
            (isDragOffBoundary === 'right' && draggingId === id)) &&
          'opacity-100 top-1/2'
        }`}
      >
        <ImageComponent src={translationsImg[currentLocale]} />
      </div>

      <div className={'absolute top-0 left-0 w-full h-full overflow-y-auto touch-pan-y'}>
        <div
          className={'absolute top-0 left-0 w-full h-full'}
          // style={{
          //   mask: 'linear-gradient( transparent 0%,transparent 40%,black 70vh)',
          //   backdropFilter: 'blur(48px)',
          // }}
        />

        <div className={'grid grid-rows-[1fr_auto] h-full relative '}>
          <div
            className={
              'absolute top-0 left-0 w-full h-full   bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.00691776)_6.67%,rgba(0,0,0,0.028408)_13.33%,rgba(0,0,0,0.0653279)_20%,rgba(0,0,0,0.117929)_26.67%,rgba(0,0,0,0.18542)_33.33%,rgba(0,0,0,0.265507)_40%,rgba(0,0,0,0.354153)_46.67%,rgba(0,0,0,0.445847)_53.33%,rgba(0,0,0,0.534493)_60%,rgba(0,0,0,0.61458)_66.67%,rgba(0,0,0,0.682071)_73.33%,rgba(0,0,0,0.734672)_80%,rgba(0,0,0,0.771592)_86.67%,rgba(0,0,0,0.793082)_93.33%,rgba(0,0,0,0.8)_100%)]'
            }
          />

          <div />

          <div className={'text-white px-6 pb-[70px] z-10'}>
            <h5 className={'mb-1 font-semibold text-xl2'}>{challenge.title}</h5>

            <p className={'mb-6'}>{challenge.about}</p>

            <div className={'flex w-fit items-center gap-2  font-medium text-base'}>
              <p>{challenge.categoryId.name}</p>
              <div className={'w-[6px] h-[6px] rounded-full bg-white opacity-60'} />
              <p>
                {challenge.challengePeriod}{' '}
                {formatDayCount(challenge.challengePeriod, currentLocale)}
              </p>
              <div className={'w-[6px] h-[6px] rounded-full bg-white opacity-60'} />
              <p>
                {challenge.milestoneCount}{' '}
                {formatMilestoneCount(challenge.milestoneCount, currentLocale)}
              </p>
            </div>
          </div>
        </div>

        <div
          className={' pl-8 pr-6 overflow-hidden bg-[rgba(0,0,0,0.8)]'}
          style={
            {
              // backdropFilter: 'blur(48px)',
            }
          }
        >
          {challenge.milestones.map((mil, key) => (
            <MilestoneCard
              key={`${mil.description}-${key}-mil-card`}
              milestone={mil}
              activeDayNumber={null}
              isCompleted={true}
              isDiscover
              isLastMilestone={challenge.milestones.length - 1 === key}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default TinderCard
