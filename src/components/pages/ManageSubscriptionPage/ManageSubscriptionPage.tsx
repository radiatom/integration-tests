import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useProfile from '@/hooks/useProfile'
import { TabsList } from '@/components/TabsList/TabsList'
import { TabItem } from '@/components/TabsList/types/index.types'
import { Subscriptions, Profile } from './components'
import { updateSentryUser } from '@/services/analytics/sentry-init'

import Header from '@/components/Header/Header'
import Layout from '@/components/Layout'
import Avatar from '@/components/Avatar/Avatar'
import { Loader } from '@/components/Loader/Loader'

export const TABS = {
  PROFILE: 'profile',
  SUBSCRIPTIONS: 'subscriptions',
  // PAYMENTS: 'payments',
} as const

const ManageSubscriptionPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabItem>(
    () => (sessionStorage.getItem('activeTab') as TabItem) || TABS.PROFILE,
  )

  const { data, isLoading } = useProfile()

  useEffect(() => {
    if (data) {
      updateSentryUser({
        ...(data.id && { id: data.id }),
        ...(data.email && { email: data.email }),
        ...(data.userName && { username: data.userName }),
      })
    }
  }, [data])

  const tabComponents = {
    [TABS.PROFILE]: <Profile items={data?.manageSubscriptionItems} />,
    [TABS.SUBSCRIPTIONS]: (
      <Subscriptions paymentPlan={data?.paymentPlan} paymentUpsale={data?.upSale} />
    ),
    // [TABS.PAYMENTS]: <Payments />,
  }

  return (
    <Layout>
      <div className="relative overflow-y-auto min-h-full w-full  flex flex-col h-full overflow-x-hidden pb-20 ">
        <Header
          title={t('manageSubscription')}
          onBackClick={() => navigate(-1)}
          showBtn={true}
          fixed={true}
        />

        <div className="bg-white rounded-b-[25px] mt-[-40px] p-4 ">
          {data && (
            <div className="flex flex-col items-center w-full mt-16 ">
              <Avatar linkImg={data.avatar} name={data.userName} classNameWrapper={'shrink-0'} />

              <h3 className="font-outfit min-h-7 mt-3 font-semibold text-center transition-all duration-300 text-xl2 capitalize">
                {data.userName}
              </h3>
            </div>
          )}

          <TabsList
            list={Object.values(TABS)}
            activeTab={activeTab}
            onChange={(item) => {
              sessionStorage.setItem('activeTab', item)
              setActiveTab(item)
            }}
          />
        </div>

        <div className="mt-4 ">{isLoading ? <Loader /> : (tabComponents[activeTab] ?? null)}</div>
      </div>
    </Layout>
  )
}

export default ManageSubscriptionPage
