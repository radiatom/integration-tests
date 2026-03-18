import React, { FC, useEffect, useState } from 'react'
import {
  Challenge,
  typeFinishedChallengesEnum,
  UserChallenge,
  UserChallengesActiveResponse,
  UserChallengesFinishedResponse,
} from '@/types/interfaces'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import 'react-swipeable-list/dist/styles.css'
import deleteSvg from '@/assets/images/challenges/delete.svg'
import ChallengePartialCard from '@/components/pages/ChallengesPage/components/CompletedChallenges/components/ChallengePartialCard'
import ChallengeSuccessfulCard from '@/components/pages/ChallengesPage/components/CompletedChallenges/components/ChallengeSuccessfulCard'
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from 'react-swipeable-list'
import { ROUTES } from '@/constants/routes'
import { useNavigate } from 'react-router-dom'
import ModalQuestionDeleteChallenge from '@/components/pages/ChallengesPage/components/CompletedChallenges/components/ModalQuestionDeleteChallenge'
import rocketSvg from '@/assets/images/challenges/rocket.svg'
import ModalQuestionInChallenge from '@/components/pages/ChallengePage/components/ModalQuestionInChallenge'
import useRestartChallengeMutation from '@/hooks/useRestartChallengeMutation'

// interface
interface ICompletedChallengesProps {
  challengesActive?: UserChallengesActiveResponse
  challengesAllData: UserChallenge[]
  challengesFinishedSuccessful: UserChallengesFinishedResponse | undefined
  challengesFinishedPartial: UserChallengesFinishedResponse | undefined
}

interface Category {
  name: string
  slug: typeFinishedChallengesEnum
  challenges: UserChallenge[]
}

// component
const CompletedChallenges: FC<Readonly<ICompletedChallengesProps>> = ({
  challengesActive,
  challengesAllData,
  challengesFinishedSuccessful,
  challengesFinishedPartial,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [deleteChallengeId, setDeleteChallengeId] = useState<null | string>(null)
  const [restartChallengeId, setRestartChallengeId] = useState<null | string>(null)

  const { mutate: restartChallengeMutation } = useRestartChallengeMutation({
    onSuccess: (challenge) => {
      navigate(`${ROUTES.CHALLENGES}/${challenge._id}`)
      setRestartChallengeId(null)
    },
  })

  const doingCategories = (
    challengesAllData: UserChallenge[],
    challengesFinishedSuccessful: UserChallengesFinishedResponse | undefined,
    challengesFinishedPartial: UserChallengesFinishedResponse | undefined,
  ) => {
    return [
      { name: t('all'), slug: typeFinishedChallengesEnum.All, challenges: challengesAllData },
      challengesFinishedSuccessful && challengesFinishedSuccessful.length > 0
        ? {
            name: t('successful'),
            slug: typeFinishedChallengesEnum.Successful,
            challenges: challengesFinishedSuccessful,
          }
        : null,
      challengesFinishedPartial && challengesFinishedPartial.length > 0
        ? {
            name: t('partial'),
            slug: typeFinishedChallengesEnum.Partial,
            challenges: challengesFinishedPartial,
          }
        : null,
    ].filter((el) => el !== null) as Category[]
  }

  const onRestart = async () => {
    if (restartChallengeId) {
      await restartChallengeMutation(restartChallengeId)
    }
  }

  const [categories, setCategories] = useState<Category[]>(
    doingCategories(challengesAllData, challengesFinishedSuccessful, challengesFinishedPartial),
  )
  const [category, setCategory] = useState<Category>(
    doingCategories(challengesAllData, challengesFinishedSuccessful, challengesFinishedPartial)[0],
  )

  useEffect(() => {
    setCategories(
      doingCategories(challengesAllData, challengesFinishedSuccessful, challengesFinishedPartial),
    )
    setCategory(
      doingCategories(
        challengesAllData,
        challengesFinishedSuccessful,
        challengesFinishedPartial,
      ).find((el) => el.slug === category.slug) ||
        doingCategories(
          challengesAllData,
          challengesFinishedSuccessful,
          challengesFinishedPartial,
        )[0],
    )
  }, [challengesAllData, challengesFinishedSuccessful, challengesFinishedPartial])
  // return
  return (
    <>
      <div>
        <h3 className={'font-medium mb-3 pl-2'}>
          {t('completed')} ({challengesAllData.length})
        </h3>

        <div className={'flex gap-2 w-[calc(100%_+32px)] overflow-x-auto -mx-4 px-6 pb-5'}>
          {categories.map((cat, key) => (
            <Button
              variant={category?.slug === cat.slug ? 'green-small' : 'white-small'}
              onClick={() => setCategory(cat)}
              key={`${cat.slug}-${key}`}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        <SwipeableList
          fullSwipe={false}
          threshold={0.5}
          type={ListType.IOS}
          key={`${category.slug}-${category.challenges.length}`}
          className={'grid h-fit select-none my-[-8px]'}
        >
          {category.challenges.map((ch, key) => (
            <SwipeableListItem
              key={`${ch._id}-${key}-swipe`}
              trailingActions={
                <TrailingActions>
                  <SwipeAction destructive={false} onClick={() => setDeleteChallengeId(ch._id)}>
                    <div className="h-full grid items-center justify-items-center select-none">
                      <div
                        className={
                          'grid ml-4 mr-5 items-center justify-items-center h-10 w-10 rounded-r8 bg-gradient-to-b from-[#F99494] to-[#FF5858] shadow-[0px_6px_14px_0px_#D74D5B0F,0px_12px_24px_0px_#EC6E7B0D] transition active:scale-95'
                        }
                      >
                        <img src={deleteSvg} alt={'delete'} />
                      </div>
                    </div>
                  </SwipeAction>
                </TrailingActions>
              }
              onClick={() => navigate(`${ROUTES.CHALLENGES}/${ch._id}`)}
              className={'my-1 cursor-pointer'}
            >
              {ch.completionPercentage === 100 ? (
                <ChallengeSuccessfulCard key={`${ch._id}-${key}-successful`} challenge={ch} />
              ) : (
                <ChallengePartialCard
                  key={`${ch._id}-${key}-partial`}
                  challenge={ch}
                  isActive={
                    challengesActive && challengesActive.length > 0
                      ? !!challengesActive.find(
                          (el: Challenge) => el.challengeId._id === ch.challengeId._id,
                        )
                      : false
                  }
                  setRestartChallengeId={setRestartChallengeId}
                />
              )}
            </SwipeableListItem>
          ))}
        </SwipeableList>
      </div>

      {deleteChallengeId && (
        <ModalQuestionDeleteChallenge
          id={deleteChallengeId}
          isOpenModal={!!deleteChallengeId}
          onClose={() => setDeleteChallengeId(null)}
          onDelete={() => {
            setCategories(
              doingCategories(
                challengesAllData.filter((el) => el._id !== deleteChallengeId),
                challengesFinishedSuccessful?.filter((el) => el._id !== deleteChallengeId),
                challengesFinishedPartial?.filter((el) => el._id !== deleteChallengeId),
              ),
            )
            setCategory({
              ...category,
              challenges: category.challenges.filter((el) => el._id !== deleteChallengeId),
            })
          }}
        />
      )}

      <ModalQuestionInChallenge
        isOpenModal={restartChallengeId !== null}
        onClose={() => setRestartChallengeId(null)}
        svg={rocketSvg}
        title={t('readyForFreshStart')}
        description={t('restartChallengeMotivation')}
        textInWhiteButton={t('cancel')}
        onWhiteButtonClick={() => setRestartChallengeId(null)}
        textInGreenButton={t('letsGo')}
        onGreenButtonClick={() => onRestart()}
      />
    </>
  )
}

export default CompletedChallenges
