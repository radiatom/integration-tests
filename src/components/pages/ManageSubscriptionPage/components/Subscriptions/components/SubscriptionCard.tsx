import React, { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button/Button'
import { ROUTES } from '@/constants/routes'

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  CANCELED: 'none',
} as const

interface SubscriptionCardProps {
  subscriptionName: string
  status: (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS]
  billingPeriod: string | ReactNode
  subscriptionPrice: string | ReactNode
  chargeDate: string | ReactNode
  // paymentMethod: string | ReactNode
  paymentPlatform: string
}

const CardInfoBlock = ({
  label,
  info,
  isActiveStatus,
}: {
  label: string
  info: string | ReactNode
  isActiveStatus: boolean
}) => {
  return (
    <>
      <label className={` my-0 font-[450] text-xs ${!isActiveStatus ? 'text-[#9EA1AD]' : ''}`}>
        {label}
      </label>
      <p className="font-outfit font-semibold text-[14px] leading-[140%]">{info}</p>
    </>
  )
}

export const SubscriptionCard: FC<SubscriptionCardProps> = ({
  subscriptionName,
  status,
  subscriptionPrice,
  chargeDate,
  // paymentMethod,
  billingPeriod,
  paymentPlatform,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isActiveStatus = status === SUBSCRIPTION_STATUS.ACTIVE

  return (
    <div
      className={`rounded-3xl flex items-center justify-center w-full overflow-hidden ${isActiveStatus ? 'text-white bg-brandRadial p-1' : 'text-secondary bg-white'}`}
    >
      <div className="bg-brandRadialInside rounded-r20 w-full h-full">
        <div className="pt-4 px-5">
          <div className="flex gap-1.5">
            <label className="grow font-outfit m-0 text-xl3 font-semibold leading-[140%]">
              {subscriptionName}
            </label>
            <div
              className={`text-[14px] capitalize font-semibold rounded-[45px] shrink-0 h-fit py-1.5 px-[13px] leading-[140%] ${isActiveStatus ? 'text-white bg-green' : 'text-[#9EA1AD] bg-[#F9FAFB]'}`}
            >
              {status === SUBSCRIPTION_STATUS.ACTIVE ? status : t('canceledStatus')}
            </div>
          </div>
        </div>

        <div className="w-full my-6 px-5">
          <ul className="grid grid-cols-2 grid-rows-2 gap-y-6 w-full">
            <li>
              <CardInfoBlock
                isActiveStatus={isActiveStatus}
                label={t('billingPeriod')}
                info={billingPeriod}
              />
            </li>
            <li>
              <CardInfoBlock
                isActiveStatus={isActiveStatus}
                label={t('subscriptionPrice')}
                info={subscriptionPrice}
              />
            </li>
            <li>
              <CardInfoBlock
                isActiveStatus={isActiveStatus}
                label={isActiveStatus ? t('nextChargeDate') : t('accessUntil')}
                info={chargeDate}
              />
            </li>
            {/* TODO Add Payment method when it will be ready */}
            {/* <li> */}
            {/*  <CardInfoBlock */}
            {/*    isActiveStatus={isActiveStatus} */}
            {/*    label={t('paymentMethod')} */}
            {/*    info={paymentMethod} */}
            {/*  /> */}
            {/* </li> */}
          </ul>
        </div>

        {isActiveStatus && (
          <div
            className={`pt-4 px-5 pb-5 relative ${isActiveStatus ? 'bg-brandRadialFooter' : 'bg-brandRenewRadialFooter'}`}
          >
            <Button
              className={'overflow-hidden'}
              type="button"
              variant={isActiveStatus ? 'secondary' : 'default'}
              onClick={() =>
                navigate(
                  `${ROUTES.REASONS}?paymentPlatform=${paymentPlatform}&endDate=${encodeURIComponent(chargeDate as string)}`,
                )
              }
            >
              {isActiveStatus ? t('cancelSubscription') : t('renewSubscription')}
            </Button>
            <div className="rounded-full bg-[#F9FAFB] w-[21px] h-[21px] absolute left-[-14px] top-[-11px]" />
            <div className="rounded-full bg-[#F9FAFB] w-[21px] h-[21px] absolute right-[-14px] top-[-11px]" />
          </div>
        )}
      </div>
    </div>
  )
}
