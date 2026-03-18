import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IconSVG } from '@/components/IconSvg/IconSvg'
import handsImg from '@/assets/images/challenges/hands.webp'
import fingerImg from '@/assets/images/challenges/finger-down.webp'
import goalCloserSvg from '@/assets/images/challenges/goal-closer.svg'
import rocketSvg from '@/assets/images/challenges/rocket.svg'
import { Button } from '@/components/Button/Button'
import { clsx } from 'clsx'
import * as Accordion from '@radix-ui/react-accordion'
import { useTranslation } from 'react-i18next'
import ModalQuestionInChallenge from '@/components/pages/ChallengePage/components/ModalQuestionInChallenge'
import EndedChallenge from '@/components/pages/ChallengePage/components/EndedChallenge'
import useGetChallenge from '@/hooks/useGetChallenge'
import { formatDayCount } from '@/helpers/formatDayCount'
import { formatMilestoneCount } from '@/helpers/formatMilestoneCount'
import MilestoneCard from '@/components/pages/ChallengePage/components/MilestoneCard'
import { isSameDay } from 'date-fns'
import { chunkArray } from '@/components/pages/ChallengePage/helpers'
import { Challenge, statusChallengeEnum } from '@/types/interfaces'
import { ROUTES } from '@/constants/routes'
import useCompleteChallengeMutation from '@/hooks/useCompleteChallengeMutation'
import useRestartChallengeMutation from '@/hooks/useRestartChallengeMutation'
import CongratulationsChallenge from '@/components/CongratulationsChallenge/CongratulationsChallenge'
import DayCard from '@/components/pages/ChallengePage/components/DayCard/DayCard'
import ImageComponent from '@/components/ImageComponent/ImageComponent'
import useGetUserChallengeActive from '@/hooks/useGetUserChallengeActive'
import { toast } from 'sonner'
import ToastCustom from '@/components/ToastCustom/ToastCustom'

// interface
interface IChallengePageProps {}

// component
const ChallengePage: FC<Readonly<IChallengePageProps>> = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const currentLocale = i18n.language
  const { idChallenge } = useParams()
  const { data: challengesActive } = useGetUserChallengeActive()

  const { mutate: restartChallengeMutation } = useRestartChallengeMutation({
    onSuccess: (challenge) => {
      setModalType(null)
      navigate(`${ROUTES.CHALLENGES}/${challenge._id}`)
    },
  })

  const { mutate: completeChallengeMutation } = useCompleteChallengeMutation({
    onSuccess: () => {
      setModalType('ended')
    },
  })

  const [isOpenAllDays, setIsOpenAllDays] = useState(false)
  const [modalType, setModalType] = useState<'end?' | 'ended' | 'restart?' | null>(null)

  const [challenge, setChallenge] = useState<Challenge | undefined>()
  const { data: challengeData } = useGetChallenge(idChallenge)

  const days = challenge?.days
  const isCompleted = challenge?.status === statusChallengeEnum.Completed
  const activeDayNumber = days?.find((day) => isSameDay(new Date(), day.date))?.dayNumber || null
  const activeDayNumberMilestones =
    Math.ceil(
      ((challenge?.completionPercentage || 0) * (challenge?.challengeId.challengePeriod || 0)) /
        100,
    ) || 1
  const lastDayNumber = challenge?.challengeId.challengePeriod || 0

  const onRestartChallenge = () => {
    if (challengesActive?.find((el) => el.challengeId._id === challenge?.challengeId._id)) {
      setModalType(null)
      toast.custom(
        (id) => (
          <ToastCustom idToast={id}>
            <div>
              <p className={'text-[#13A2D1]'}>{t('alreadyOnChallenge')} 💪</p>
              <p className={'text-md text-secondary'}>{t('completeCurrentBeforeRestart')}</p>
            </div>
          </ToastCustom>
        ),
        { position: 'top-left' },
      )
    } else {
      setModalType('restart?')
    }
  }

  const restart = async () => {
    await restartChallengeMutation(idChallenge as string)
  }

  const onCompleteChallenge = async () => {
    await completeChallengeMutation(idChallenge as string)
  }

  useEffect(() => {
    if (challengeData) {
      setChallenge(challengeData)

      if (
        challengeData.status === statusChallengeEnum.Active ||
        (challengeData.status === statusChallengeEnum.Completed &&
          challengeData.completionPercentage === 100)
      ) {
        setIsOpenAllDays(true)
      }
    }
  }, [challengeData])

  // return
  return challenge && days ? (
    <>
      <div className={'grid grid-rows-[auto_1fr] h-full w-full overflow-y-auto overflow-x-hidden'}>
        <div
          className="absolute top-4 left-4  flex items-center justify-center w-[48px] h-[48px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#0000003D] z-10"
          onClick={() => navigate(ROUTES.CHALLENGES)}
        >
          <IconSVG type={'ARROW_BACK'} height={24} width={24} stroke={'white'} />
        </div>

        <div className={'relative w-full h-[457px] '}>
          <ImageComponent
            src={challenge.challengeId.image}
            alt={`${challenge.challengeId.title} img`}
          />

          <div
            className={clsx('bg-[#00000033]  absolute top-0 left-0 w-full h-full', {
              'bg-[linear-gradient(0deg,#13D16A_0%,#32E88500_86.83%)]': isCompleted,
            })}
          />

          <div
            className={
              'absolute bottom-0 left-0 w-full pt-[110px] px-[20px] pb-[60px]  opacity-80 bg-[linear-gradient(0deg,rgba(0,0,0,0.91)_15.51%,rgba(0,0,0,0)_100%)]'
            }
          >
            <h3 className={'mb-[4px] tracking-[-0.3px] text-white font-semibold text-xl4m'}>
              {challenge.challengeId.title}
            </h3>

            <div className={'flex w-fit items-center gap-2 text-white font-medium text-base'}>
              <p>{challenge.challengeId.categoryId.name}</p>

              <div className={'w-[6px] h-[6px] rounded-full bg-white opacity-60'} />

              <p>
                {challenge.challengeId.challengePeriod}{' '}
                {formatDayCount(challenge.challengeId.challengePeriod, currentLocale)}
              </p>

              <div className={'w-[6px] h-[6px] rounded-full bg-white opacity-60'} />

              <p>
                {challenge.challengeId.milestoneCount}{' '}
                {formatMilestoneCount(challenge.challengeId.milestoneCount, currentLocale)}
              </p>
            </div>
          </div>
        </div>

        <div className={'mt-[-40px] rounded-[32px_32px_0_0] bg-[#F9FAFB] p-4 pt-3 z-10'}>
          {isCompleted ? (
            <Button className={'mb-4'} onClick={onRestartChallenge}>
              {t('restartChallenge')}
            </Button>
          ) : (
            <div
              className={
                'grid h-[38px] w-fit px-2 mb-[26px] items-center grid-cols-[auto_auto]  gap-6'
              }
            >
              <img src={handsImg} className={'w-[17px] h-[22px] object-contain'} alt={''} />

              <div className={'text-md bg-white py-2 px-3 rounded-r16 relative'}>
                <p>{t('youCanDoIt')}</p>

                <div
                  className={
                    'absolute top-1/2 -translate-y-1/2 left-[-12px] w-0 h-0 border-t-[13px] border-t-white border-l-[13px] border-l-transparent'
                  }
                />
              </div>
            </div>
          )}

          <h3 className={'mb-1 font-medium text-base'}>{t('aboutChallenge')}</h3>

          <p className={'mb-8 text-md text-secondary'}>{challenge.challengeId.about}</p>

          <div className={'flex mb-8 items-center'}>
            <p className={'text-md text-secondary'}>{t('justTapToMarkADay')}</p>

            <ImageComponent src={fingerImg} className={'w-[10px] h-[18px] ml-1'} />
          </div>

          <button
            className={'grid w-full text-start mb-3 grid-cols-[1fr_auto] items-center'}
            onClick={() => setIsOpenAllDays(!isOpenAllDays)}
          >
            <h4 className={'font-medium text-base'}>{t('markDays')}</h4>

            {days.length > 5 && (
              <span
                className={
                  'grid justify-items-center items-center w-[24px] h-[24px] rounded-[6px] bg-[#00000008] active:scale-95 transition'
                }
              >
                <span
                  className={clsx('', { '-rotate-90': !isOpenAllDays, 'rotate-90': isOpenAllDays })}
                >
                  <IconSVG type={'ARROW_BACK'} height={17} width={17} stroke={'#9EA1AD'} />
                </span>
              </span>
            )}
          </button>

          <div className={'mx-[-13px]'}>
            <div className={'flex pb-[25px]'}>
              {chunkArray(days)[0].map((day, keyDay) => (
                <div
                  key={`${day.dayNumber}-${keyDay}`}
                  className={clsx(
                    'relative max-w-[20%] w-full after:absolute after:top-1/2 after:right-[-3px] after:w-[6px] after:h-px after:rounded-full after:bg-green last:after:opacity-0',
                    {
                      'before:absolute before:top-[calc(100%_+_3px)] before:left-1/2 before:w-px before:h-[19px] before:rounded-full before:bg-green before:-translate-x-[125%]':
                        (keyDay + 1) % 5 === 0 && isOpenAllDays,
                    },
                  )}
                >
                  <DayCard
                    idChallenge={challenge._id}
                    day={day}
                    activeDayNumber={activeDayNumber}
                    isLastDay={lastDayNumber === day.dayNumber}
                    setChallenge={setChallenge}
                    isDisable={isCompleted}
                  />
                </div>
              ))}
            </div>

            <Accordion.Root type="single" collapsible value={isOpenAllDays ? 'all-days' : ''}>
              <Accordion.Item value="all-days" className="border-none">
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <div className={'grid pb-8 gap-y-[25px]'}>
                    {chunkArray(days)
                      .slice(1)
                      .map((row, key) => (
                        <div
                          key={`row-${key}`}
                          className={clsx('flex', {
                            'flex-row-reverse': key % 2 === 0,
                            'flex-row': key % 2 !== 0,
                          })}
                        >
                          {row.map((day, keyDay) => (
                            <div
                              key={`${day.dayNumber}-${keyDay}`}
                              className={clsx(
                                'relative max-w-[20%] w-full after:absolute after:top-1/2 after:right-[-3px] after:w-[6px] after:h-px after:rounded-full after:bg-green ',
                                {
                                  'first:after:opacity-0': key % 2 === 0,
                                  'before:absolute before:top-[calc(100%_+_3px)] before:left-1/2 before:w-px before:h-[19px] before:rounded-full before:bg-green before:-translate-x-[125%]':
                                    (keyDay + 1) % 5 === 0,
                                  'last:after:opacity-0': key % 2 !== 0,
                                },
                              )}
                            >
                              <DayCard
                                idChallenge={challenge._id}
                                activeDayNumber={activeDayNumber}
                                day={day}
                                isLastDay={lastDayNumber === day.dayNumber}
                                setChallenge={setChallenge}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>

          <div
            className={
              'rounded-r16 mb-8 pt-4 pl-[37px] pr-[44px] bg-white shadow-[0px_1px_2px_0px_#0000000A,0px_2px_4px_0px_#00000005] overflow-hidden'
            }
          >
            {challenge.challengeId.milestones.map((mil, key) => (
              <MilestoneCard
                key={`${mil.description}-${key}-mil-card`}
                milestone={mil}
                activeDayNumber={
                  challenge.completionPercentage > 0 && activeDayNumberMilestones
                    ? activeDayNumberMilestones
                    : null
                }
                isCompleted={challenge.completionPercentage === 100}
              />
            ))}
          </div>

          {!isCompleted && (
            <Button className={'mb-4'} variant={'red'} onClick={() => setModalType('end?')}>
              {t('endChallenge')}
            </Button>
          )}
        </div>
      </div>

      <ModalQuestionInChallenge
        isOpenModal={modalType === 'end?'}
        onClose={() => setModalType(null)}
        svg={goalCloserSvg}
        title={t('yourGoalMayBeCloser')}
        description={t('stopChallengeConfirmation')}
        textInWhiteButton={t('endChallenge')}
        onWhiteButtonClick={() => onCompleteChallenge()}
        textInGreenButton={t('keepGoing')}
        onGreenButtonClick={() => setModalType(null)}
      />

      <ModalQuestionInChallenge
        isOpenModal={modalType === 'restart?'}
        onClose={() => setModalType(null)}
        svg={rocketSvg}
        title={t('readyForFreshStart')}
        description={t('restartChallengeMotivation')}
        textInWhiteButton={t('cancel')}
        onWhiteButtonClick={() => setModalType(null)}
        textInGreenButton={t('letsGo')}
        onGreenButtonClick={() => restart()}
      />

      {modalType === 'ended' && (
        <CongratulationsChallenge comment={t('firstStepsAreHard')}>
          <EndedChallenge />
        </CongratulationsChallenge>
      )}
    </>
  ) : null
}

export default ChallengePage
