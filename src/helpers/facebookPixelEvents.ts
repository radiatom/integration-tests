import { track, setUserId } from '@amplitude/analytics-browser'
import { PaymentPlan } from '@/types/types'

export const trackPlan = (plan: PaymentPlan) => {
  track('payment:selectPlane', plan)
}
export const trackEmail = (event: string, email: string) => {
  track(event, { email })
}
export const trackUnsubscribe = (message: object) => {
  track('user_unsubscribe', message)
}
export const trackErrors = (payment: string, e: any) => {
  track(`unsubscribe_error:${payment}`, { error: e })
}

export const setUserIdAmplitude = (id: string) => {
  setUserId(id)
}
