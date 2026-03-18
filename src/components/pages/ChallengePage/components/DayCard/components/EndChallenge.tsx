import React, { FC } from 'react'
import successSvg from '@/assets/images/challenges/check-circle.svg'
import checkSvg from '@/assets/images/challenges/check.svg'
import circleGraySvg from '@/assets/images/challenges/circle-gray.svg'
import { useTranslation } from 'react-i18next'
import { formatDayCount } from '@/helpers/formatDayCount'
import CongratulationsChallenge from '@/components/CongratulationsChallenge/CongratulationsChallenge'
import { Challenge } from '@/types/interfaces'
import stepSvg from '@/assets/images/challenges/steps.svg'
import { clsx } from 'clsx'

// interface
interface IEndChallengeProps {
  challenge: Challenge
}

// component
const EndChallenge: FC<Readonly<IEndChallengeProps>> = ({ challenge }) => {
  const { t, i18n } = useTranslation()
  const isCompleted = challenge.completionPercentage === 100
  const currentLocale = i18n.language

  // return
  return (
    <CongratulationsChallenge
      isFireworks={isCompleted}
      comment={isCompleted ? t('mindOverBody') : t('stumbleMotivation')}
    >
      <div className={'grid gap-4 w-full justify-items-center'}>
        <img src={isCompleted ? successSvg : stepSvg} alt={'step'} className={'h-[48px]'} />

        <h4 className={'font-semibold text-xl4 text-center text-dark max-w-[232px]'}>
          {isCompleted ? t('congratulations') : t('greatEffort')}
        </h4>

        <p className={'text-base2 text-secondary text-center'}>
          {isCompleted ? (
            <>
              {t('challengeCompletedSuccess')}{' '}
              <span className={'font-medium'}>{challenge.challengeId.title}</span>
              {t('challengeCompletedSuccess2')}
            </>
          ) : (
            t('challengeOverStats', {
              countDays: challenge.daysCompleted,
              countSteps: challenge.challengeId.challengePeriod,
            })
          )}
        </p>

        <div className={'grid w-full px-2 grid-cols-[1fr_112px] gap-2'}>
          <div>
            <h4 className={'font-semibold text-xl2 mb-3'}>{t('whatYouWillGet')}</h4>

            <div>
              {challenge.challengeId.milestones.map((mil, key) => (
                <div
                  className={'grid grid-cols-[auto_1fr] gap-3'}
                  key={`${key}-${mil.whatYouGet}-item`}
                >
                  <div
                    className={
                      'grid relative top-[5px] grid-rows-[auto_1fr] h-full justify-items-center'
                    }
                  >
                    {challenge.daysCompleted < mil.dayEnd ? (
                      <img src={circleGraySvg} alt={'circle'} />
                    ) : (
                      <div
                        className={
                          'grid items-center justify-items-center w-[14px] h-[14px] rounded-full bg-[linear-gradient(180deg,#6DE187_0%,#61CE75_100%)]'
                        }
                      >
                        <img src={checkSvg} alt={'check'} />
                      </div>
                    )}

                    {challenge.challengeId.milestones.length !== key + 1 && (
                      <div
                        className={clsx('relative w-px h-full  -translate-x-1/2', {
                          'bg-border1': challenge.daysCompleted < mil.dayEnd,
                          'bg-green': challenge.daysCompleted >= mil.dayEnd,
                        })}
                      />
                    )}
                  </div>

                  <div className={'pb-3  font-medium text-base'}>{mil.whatYouGet}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={'grid gap-[6px]'}>
            <div
              className={
                'grid items-center justify-items-center w-full h-[85px] p-[7px] rounded-r16 bg-[#F9FAFB]'
              }
            >
              <div className={'text-center'}>
                <p className={'font-semibold text-xl2'}>
                  {challenge.daysCompleted} {formatDayCount(challenge.daysCompleted, currentLocale)}
                </p>
                <p className={'text-[#9EA1AD] text-xs'}>{t('behind')}</p>
              </div>
            </div>

            <div
              className={
                'grid items-center justify-items-center w-full h-[85px] p-[7px] rounded-r16 bg-[#F9FAFB]'
              }
            >
              <div className={'text-center'}>
                <p className={'font-semibold text-xl2'}>{challenge.completionPercentage}%</p>
                <p className={'text-[#9EA1AD] text-xs'}>{t('completionRate')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CongratulationsChallenge>
  )
}

export default EndChallenge
