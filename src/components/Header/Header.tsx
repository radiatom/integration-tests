import React, { FC, useEffect, useState } from 'react'

import arrowBackSvg from '@/assets/images/svg/arrow-back-thin.svg'

// interface
interface HeaderProps {
  title?: string
  onBackClick?: () => void
  showBtn?: boolean
  isLastQuestion?: boolean
  hideHeader?: boolean
  hideBtnHeader?: boolean
  hideBackHeader?: boolean
  hideNav?: boolean
  fixed?: boolean
  withShadow?: boolean
  isTransparent?: boolean
}

// component
const Header: FC<Readonly<HeaderProps>> = ({
  title,
  withShadow,
  fixed,
  isTransparent,
  isLastQuestion,
  hideNav,
  showBtn,
  hideBtnHeader,
  hideBackHeader,
  onBackClick,
  hideHeader,
}) => {
  const [showOnLastQuestion, setShowOnLastQuestion] = useState(isLastQuestion)
  useEffect(() => {
    setShowOnLastQuestion(false)
  }, [isLastQuestion])

  // return
  return (
    <div
      className={`w-full ${withShadow ? 'shadow-header' : ''} ${fixed ? 'sticky top-0 left-0 -mt-4 p-4 ' : ''} ${!isTransparent && 'bg-white'} pb-4 relative z-20 transition-all ${hideNav ? '-translate-y-full opacity-0 h-0' : 'translate-y-0'}`}
    >
      <div className="w-full">
        <div className="flex justify-center items-center relative  min-h-[40px]">
          <div
            className={` ${showBtn && !hideBtnHeader && !hideBackHeader ? 'opacity-100 visible' : 'opacity-0  invisible'} cursor-pointer absolute top-1/2 left-0 -translate-y-1/2 transition-all duration-300 active:scale-95`}
            onClick={onBackClick}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-backButtonBorder hover:opacity-70 transition-all duration-300">
              <img width={24} height={24} src={arrowBackSvg} alt="arrow-back" />
            </div>
          </div>
          <h3
            className={`${
              !hideHeader && !showOnLastQuestion ? 'opacity-100 visible' : 'opacity-0  invisible'
            } font-medium text-center font-outfit transition-all duration-300 text-base`}
          >
            {title}
          </h3>
        </div>
      </div>
    </div>
  )
}
export default Header
