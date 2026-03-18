import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import MultiCheckbox from '@/components/MultiCheckbox'
import { usePopup } from '@/providers/PopupContext'
import { trackUnsubscribe } from '@/helpers/facebookPixelEvents'
import useUnsubscribe from '@/hooks/useUnsubscribe'
import { ROUTES } from '@/constants/routes'
import { toast } from 'sonner'

import loaderSvg from '@/assets/images/svg/loader.svg'

const ReasonsPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const { mutate: unsubscribe, isLoading: loading, error } = useUnsubscribe()
  const paymentPlatform = queryParams.get('paymentPlatform') as string
  const endDate = queryParams.get('endDate') as string
  const { setOpen, setPopupContent } = usePopup()
  const [reasonsSelected, setReasonsSelected] = useState<string[]>([])

  const options = [
    { id: 1, value: 'too_expensive', label: t('tooExpensive') },
    { id: 2, value: 'plan_expectation', label: t('planNotSuitable') },
    {
      id: 3,
      value: 'app_quality',
      label: t('appQualityDisappointment'),
    },
    {
      id: 4,
      value: 'not_using_app',
      label: t('notUsingButMayReturn'),
    },
    { id: 5, value: 'goals_achieved', label: t('goalsAchieved') },
    {
      id: 6,
      value: 'technical_issues',
      label: t('technicalIssues'),
    },
    {
      id: 7,
      value: 'hard_plan',
      label: t('planTooChallenging'),
    },
    {
      id: 8,
      value: 'auto_renewal_fee',
      label: t('avoidAutoRenewalFee'),
    },
  ]

  const handleCheckboxChange = (selectedValues: string[]) => {
    setReasonsSelected(selectedValues)
  }

  const handleUnsubscribe = async () => {
    const userEmail = localStorage.getItem('userEmail')
    const userProgram = localStorage.getItem('userProgram')
    const unsubscribeData: Record<string, string | null> = {
      email: userEmail,
      gender: 'female',
      user_program: userProgram,
    }

    reasonsSelected.forEach((value) => {
      const matchedOption = options.find((opt) => opt.value === value)
      if (matchedOption) {
        unsubscribeData[`reason_${matchedOption.id}`] = matchedOption.value
      }
    })

    unsubscribe(
      { paymentPlatform },
      {
        onSuccess: () => {
          trackUnsubscribe(unsubscribeData)
          navigate(`${ROUTES.OFFER}?endDate=${endDate}`, { replace: true })
        },
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  useEffect(() => {
    if (error) openPopupError()
  }, [error])

  const openPopupError = () => {
    setPopupContent({
      title: `${t('opps')}`,
      description: `${t('contactUsEmail')}`,
      buttonText: `${t('ok')}`,
      onButtonClick: () => {
        navigate(ROUTES.PROFILE)
      },
    })
    setOpen(true)
  }

  return (
    <div className="w-full relative py-5 px-4 flex flex-col pt-3 h-full overflow-y-auto overflow-x-hidden pb-20">
      <h2 className="text-dark relative text-center font-[550] pt-4 mb-0 text-[30px] leading-[130%] tracking-[-0.3px]">
        {t('cancelSubscriptionReason')}
      </h2>

      <div className="mt-6">
        <MultiCheckbox options={options} onChange={handleCheckboxChange} />
      </div>

      <div className="mt-5">
        {loading ? (
          <div className="flex justify-center items-center mt-5">
            <img src={loaderSvg} alt={t('loader')} className="animate-spin h-5 w-5 text-white" />
          </div>
        ) : (
          <>
            <Button
              className={`${loading || !reasonsSelected[0] ? 'opacity-35 before:hidden' : ''} `}
              type="button"
              onClick={() => (!loading && reasonsSelected[0] ? handleUnsubscribe() : null)}
              // onClick={() => (!loading && reasonsSelected[0] ? openPopup() : null)}
            >
              {t('cancelSubscription')}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default ReasonsPage
