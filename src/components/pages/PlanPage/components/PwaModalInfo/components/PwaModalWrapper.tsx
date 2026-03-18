import React, { ReactNode } from 'react'
import crossIcon from '@/assets/images/svg/cross.svg'

type PwaModalWrapperProps = {
  children: ReactNode
  onClose: () => void
  isOpen: boolean
}

export const PwaModalWrapper = ({ children, onClose, isOpen }: PwaModalWrapperProps) => {
  return (
    <div
      className={`fixed inset-0 z-20 bg-[rgba(15,15,18,0.35)] transition duration-500 backdrop-blur-md ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="w-full max-w-[450px] mx-auto bg-white h-full flex flex-col relative">
        <div className="grow overflow-y-auto px-4 relative">
          <button
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center"
            onClick={onClose}
          >
            <img src={crossIcon} alt="close" className="w-4 h-4" />
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}
