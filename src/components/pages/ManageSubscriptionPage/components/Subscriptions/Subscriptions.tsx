import React from 'react'
import { Subscription } from '@/types/interfaces'
import formatDate from '@/lib/formatDate'
import { SubscriptionCard } from './components'

export const Subscriptions = ({
  paymentPlan,
  paymentUpsale,
}: {
  paymentPlan: any
  paymentUpsale: any
}) => {
  return (
    <div className="pl-4 pr-5 space-y-4">
      {paymentPlan?.subscriptions?.map((subscription: Subscription) => (
        <SubscriptionCard
          key={'primer'}
          subscriptionName={subscription?.name || ''}
          status={subscription?.status}
          billingPeriod={`${subscription?.name === 'Fit4me monthly' ? '1 Month' : subscription?.billingPeriod || ''}`}
          subscriptionPrice={
            <>
              {subscription?.paymentPlatform !== 'primer' && '$'}
              {subscription?.nextInvoice?.amount || ''}
            </>
          }
          chargeDate={
            subscription?.nextInvoice?.dateAt ? formatDate(subscription.nextInvoice.dateAt) : ''
          }
          // paymentMethod={'Undefined'}
          paymentPlatform={'primer'}
        />
      ))}

      {paymentUpsale && paymentUpsale?.status && (
        <SubscriptionCard
          key={'primer-meal'}
          subscriptionName={paymentUpsale?.name}
          status={paymentUpsale?.status}
          billingPeriod={`${paymentUpsale?.name === 'Fit4me monthly' ? '1 Month' : paymentUpsale?.billingPeriod || ''}`}
          subscriptionPrice={paymentUpsale?.nextInvoice?.amount || ''}
          chargeDate={
            paymentUpsale?.nextInvoice?.dateAt ? formatDate(paymentUpsale.nextInvoice.dateAt) : ''
          }
          // paymentMethod={'Undefined'}
          paymentPlatform={'primer-meal'}
        />
      )}
    </div>
  )
}
