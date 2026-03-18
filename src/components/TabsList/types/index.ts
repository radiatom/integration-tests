import { TABS } from '@/components/pages/ManageSubscriptionPage/ManageSubscriptionPage'

export type TabItem = (typeof TABS)[keyof typeof TABS]
