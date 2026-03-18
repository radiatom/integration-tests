import React, { FC, useEffect, useState } from 'react'
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer'
import { useTranslation } from 'react-i18next'

// interface
interface INextUpProps {
  onBlur: () => void
  timeWait: number
  onClose: () => void
  isStop: boolean
}

// component
const NextUp: FC<Readonly<INextUpProps>> = ({ onBlur, timeWait, onClose, isStop }) => {
  const [isOpenTextGo, setIsOpenTextGo] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (!isOpenTextGo) return

    const timeout = setTimeout(() => {
      setIsOpenTextGo(false)
      onClose()
    }, 1500)

    return () => clearTimeout(timeout)
  }, [isOpenTextGo])

  // return
  return (
    <div
      className={`grid pb-[120px] items-end justify-items-center absolute top-0 left-0 w-full h-full z-10 ${!isOpenTextGo && 'bg-[#0000005E]'}`}
      onClick={onBlur}
    >
      {!isOpenTextGo && (
        <div className={'grid justify-items-center  grid-rows-[1fr_auto] text-white font-semibold'}>
          <h3 className={'text-xl6 text-center'}>{t('nextUp')}</h3>
          <CountdownTimer
            initialSeconds={timeWait}
            classNameWrapper={'text-xl3'}
            onEnd={() => setIsOpenTextGo(true)}
            isStop={isStop}
          />
        </div>
      )}

      <p
        className={` absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white uppercase text-xl6 font-bold z-10 duration-1000 scale-0 ${isOpenTextGo && 'scale-100'}`}
      >
        {t('go')}
      </p>
    </div>
  )
}

export default NextUp
