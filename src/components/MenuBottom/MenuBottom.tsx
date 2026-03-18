import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { IconSVG } from '@/components/IconSvg/IconSvg'
import SideMenu from '@/components/MenuBottom/components/SideMenu'
import useProfile from '@/hooks/useProfile'
import { useAuth } from '@/providers/AuthContext'

// component
const MenuBottom = () => {
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation()
  const location = useLocation()
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)
  const { data: profile } = useProfile(!isAuthenticated)

  if (
    !location.pathname.includes(ROUTES.PLAN) &&
    (!location.pathname.includes(ROUTES.WORKOUTS_GROUPS) ||
      location.pathname.includes(`${ROUTES.WORKOUTS_GROUPS}/`)) &&
    !location.pathname.includes(ROUTES.MEALS)
  ) {
    return null
  }

  // return
  return (
    <>
      <div
        className={
          'absolute bottom-0 left-0 w-full  bg-white py-[5px] grid grid-cols-[1fr_1fr_1fr] border-t border-[#E5E5EA] z-20 shadow-[0px_12px_28px_0px_rgba(0,0,0,0.02),_0px_20px_40px_0px_rgba(0,0,0,0.04),_0px_32px_64px_0px_rgba(0,0,0,0.03)]'
        }
      >
        <Link
          className={`grid justify-items-center pt-1 pb-[3px] gap-[2px] h-fit transition active:scale-95 ${location.pathname.includes(ROUTES.PLAN) && !isOpenSideMenu ? 'text-green4' : 'text-secondary'}`}
          to={ROUTES.PLAN}
          onClick={() => setIsOpenSideMenu(false)}
        >
          <IconSVG type={'PLAN'} className="w-[28px] h-[28px]" />

          <p className={'font-semibold text-xs4 text-center leading-normal'}>{t('plan')}</p>
        </Link>

        <Link
          className={`grid justify-items-center pt-1 pb-[3px] gap-[2px] h-fit transition active:scale-95 ${location.pathname.includes(ROUTES.WORKOUTS_GROUPS) && !isOpenSideMenu ? 'text-green4' : 'text-secondary'}`}
          to={ROUTES.WORKOUTS_GROUPS}
          onClick={() => setIsOpenSideMenu(false)}
        >
          <IconSVG type={'WORKOUTS'} className="w-[28px] h-[28px]" />

          <p className={'font-semibold text-xs4 text-center leading-normal'}>{t('workouts')}</p>
        </Link>

        <div
          className={`grid justify-items-center pt-1 pb-[3px] gap-[2px] h-fit cursor-pointer transition active:scale-95 ${isOpenSideMenu ? 'text-green4' : 'text-secondary'}`}
          onClick={() => setIsOpenSideMenu(!isOpenSideMenu)}
        >
          <IconSVG type={'MORE'} className="w-[28px] h-[28px]" />

          <p className={'font-semibold text-xs4 text-center leading-normal'}>{t('more')}</p>
        </div>
      </div>

      <SideMenu
        isOpen={isOpenSideMenu}
        onClose={() => setIsOpenSideMenu(false)}
        profile={profile}
      />
    </>
  )
}

export default MenuBottom
