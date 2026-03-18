import React, { Dispatch, FC, SetStateAction } from 'react'
import percentSvg from '@/assets/images/challenges/percent.svg'
import { formatDayCount } from '@/helpers/formatDayCount'
import { useTranslation } from 'react-i18next'
import { UserChallenge } from '@/types/interfaces'
import { toast } from 'sonner'
import ToastCustom from '@/components/ToastCustom/ToastCustom'
import { IconSVG } from '@/components/IconSvg/IconSvg'
import { clsx } from 'clsx'
import ImageComponent from '@/components/ImageComponent/ImageComponent'

// interface
interface IChallengePartialCardProps {
  challenge: UserChallenge
  isActive: boolean
  setRestartChallengeId: Dispatch<SetStateAction<string | null>>
}

// component
const ChallengePartialCard: FC<Readonly<IChallengePartialCardProps>> = ({
  challenge,
  isActive,
  setRestartChallengeId,
}) => {
  const { i18n, t } = useTranslation()
  const currentLocale = i18n.language

  const onOpenModalRestart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setRestartChallengeId(challenge._id)
  }

  const onToast = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
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
  }

  // return
  return (
    <div
      className={
        'grid gap-5 w-full grid-cols-[auto_1fr_auto] items-center p-3 pr-5 rounded-r16 bg-white shadow-[0px_1px_2px_0px_#0000000A,0px_2px_4px_0px_#00000005] transition active:scale-95'
      }
    >
      <div
        className={'relative w-[84px] h-[84px] p-[2px] rounded-r10 rotate-180 bg-[#B7BABE]'}
        style={{
          backgroundImage: `conic-gradient(#13D16A, #13D16A ${challenge.completionPercentage}%, transparent ${challenge.completionPercentage}%)`,
        }}
      >
        <ImageComponent
          src={challenge.challengeId.image}
          alt={challenge.challengeId.title}
          className={
            'w-full h-full object-cover border-2 border-white rounded-r8 relative rotate-180'
          }
        />

        <div
          className={
            ' w-[15px] h-[15px] rounded-full bg-white absolute top-[-2px] left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180 shadow-[0px_2.61px_5.22px_0px_#66D74D29,0px_5.22px_13.04px_0px_#7AEC6E42]'
          }
        />

        <div className={'absolute top-[-6px] left-1/2 -translate-x-1/2 rotate-180'}>
          <img src={percentSvg} alt={'percent'} />

          <span
            className={
              'absolute top-0 left-1/2 -translate-x-1/2 font-semibold text-md leading-[150%] text-white'
            }
          >
            {challenge.completionPercentage}%
          </span>
        </div>
      </div>

      <div className={'grid grid-rows-[auto_1fr_auto] h-full'}>
        <p className={'text-secondary text-xs2 font-[450]'}>
          {challenge.daysCompleted}/{challenge.challengeId.challengePeriod}{' '}
          {formatDayCount(challenge.challengeId.challengePeriod, currentLocale)}
        </p>

        <p className={'font-medium line-clamp-2'}>{challenge.challengeId.title}</p>

        <div className={'grid gap-1 grid-cols-[auto_auto] w-fit'}>
          <div
            className={
              'py-[2px] px-[6px] bg-[#00000008] text-[450] text-[#B7BABE] text-xs rounded-full '
            }
          >
            {challenge.challengeId.categoryId.name}
          </div>

          <div
            className={
              'py-[2px] px-[6px] bg-[#00000008] text-[450] text-[#B7BABE] text-xs rounded-full '
            }
          >
            {challenge.challengeId.challengePeriod}{' '}
            {formatDayCount(challenge.challengeId.challengePeriod, currentLocale)}
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'grid items-center justify-items-center w-10 h-10 rounded-r12 transition active:scale-95 ',
          {
            'bg-[#E9F9F0]': !isActive,
            'bg-[#00000008]': isActive,
          },
        )}
        onClick={(e) => (isActive ? onToast(e) : onOpenModalRestart(e))}
      >
        <IconSVG type={'REFRESH'} stroke={isActive ? '#B7BABE' : '#13D16A'} />
      </div>
    </div>
  )
}

export default ChallengePartialCard
