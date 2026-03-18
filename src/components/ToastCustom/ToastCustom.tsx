import React, { FC, ReactNode } from 'react'
import toastSvg from '@/assets/images/challenges/toast-svg.svg'
import { toast } from 'sonner'
import { IconSVG } from '@/components/IconSvg/IconSvg'

// interface
interface IToastCustomProps {
  idToast: string | number
  children: ReactNode
}

// component
const ToastCustom: FC<Readonly<IToastCustomProps>> = ({ idToast, children }) => {
  // return
  return (
    <div className={'grid justify-items-center w-screen relative left-[-16px]'}>
      <div className={'max-w-content w-full px-[10px] '}>
        <div
          className={
            'grid items-center grid-cols-[auto_1fr_auto] bg-white  py-2 px-3 w-full rounded-r16 shadow-[0px_7px_44px_0px_rgba(0,0,0,0.1)]'
          }
        >
          <img src={toastSvg} alt={'toast'} className={'mr-3'} />

          <div>{children}</div>

          <div
            className="cursor-pointer flex items-center justify-center w-[32px] h-[32px] transition active:scale-95  z-50 text-dark"
            onClick={() => toast.dismiss(idToast)}
          >
            <IconSVG type={'CLOSE'} height={16} width={16} fill={'#B7BABE'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToastCustom
