import React from 'react'
import LogoMiniSvg from '@/assets/images/svg/logo-mini.svg'

// component
const LoaderLogo = () => {
  // return
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-white duration-300">
      <div className="flex flex-col items-center">
        <img
          src={LogoMiniSvg}
          width={150}
          height={150}
          alt={'logo mini'}
          className={'animate-pulse'}
        />
      </div>
    </div>
  )
}

export default LoaderLogo
