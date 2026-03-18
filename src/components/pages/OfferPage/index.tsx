import React from 'react'
import { useTimer } from '@/hooks/useTimer'
import { FeedbackLoader, CanceledSubscription } from './components'

const OfferPage = () => {
  const { isLoading } = useTimer({
    delay: 3000,
  })

  return (
    <div className="w-full relative py-5 px-4 flex flex-col h-full overflow-y-auto overflow-x-hidden">
      {isLoading ? <FeedbackLoader /> : <CanceledSubscription />}
    </div>
  )
}

export default OfferPage
