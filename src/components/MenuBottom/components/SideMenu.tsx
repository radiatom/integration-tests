import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import Avatar from '@/components/Avatar/Avatar'
import challengeMenuSvg from '@/assets/images/challenges/challenge-menu.svg'
import mealsMenuSvg from '@/assets/images/svg/meals-manu.svg'
import fastingMenuSvg from '@/assets/images/svg/fasting-menu.svg'
import settingsMenuSvg from '@/assets/images/svg/settings-menu.svg'
import documentSvg from '@/assets/images/svg/document.svg'
import noteTextSvg from '@/assets/images/svg/note-text.svg'
import circleWithLineSvg from '@/assets/images/svg/circles-with-line.svg'
import faqSvg from '@/assets/images/svg/faq.svg'
import { UserProfileView } from '@/types/interfaces'
import arrowRightSvg from '@/assets/images/svg/arrow-right.svg'

// interface
interface SideMenuProps {
  isOpen?: boolean
  onClose: () => void
  profile?: UserProfileView
}

// component
const SideMenu: FC<Readonly<SideMenuProps>> = ({ isOpen, onClose, profile }) => {
  const { t } = useTranslation()
  const menuItems = [
    { svg: mealsMenuSvg, title: t('meals'), link: ROUTES.MEALS },
    { svg: fastingMenuSvg, title: t('fasting'), link: ROUTES.FASTING },
    { svg: challengeMenuSvg, title: t('challenges'), link: ROUTES.CHALLENGES },
    { svg: faqSvg, title: t('FAQ'), link: ROUTES.FAQ },
    { svg: noteTextSvg, title: t('privacyPolicy'), link: ROUTES.PRIVACY_POLICY },
    { svg: circleWithLineSvg, title: t('moneyToBack'), link: ROUTES.MONEY_BACK },
    { svg: documentSvg, title: t('terms'), link: ROUTES.TERMS },
    { svg: settingsMenuSvg, title: t('appSettings'), link: ROUTES.APP_SETTINGS },
  ]
  // return
  return (
    <div
      className={`${isOpen ? 'translate-x-0' : 'translate-x-full'}  fixed top-0 right-0 h-full w-full z-[11] bg-[#F8F8F8] border border-gray transition-all duration-300 flex flex-col`}
    >
      <div
        className={
          'grid grid-rows-[auto_1fr] gap-2 max-w-content w-full mx-auto max-h-screen h-full overflow-y-auto'
        }
      >
        <div
          className={
            'w-full bg-white px-[17px] pb-[27px] rounded-[0_0_15px_15px] shadow-[0px_4px_18px_0px_#E6E6E6]'
          }
        >
          <h2 className={'font-bold text-xl45 text-green mb-[17px]'}>{t('more')}</h2>

          {profile && (
            <Link
              to={`${ROUTES.PROFILE}`}
              className={'grid grid-cols-[auto_1fr_auto] gap-3 items-center '}
              onClick={onClose}
            >
              <Avatar
                name={profile.userName}
                linkImg={profile.avatar}
                classNameWrapper={'w-[70px] h-[70px]'}
              />

              <div>
                <p className={'font-semibold text-xl3'}>{profile.userName}</p>
                <p className={'text-secondary text-base font-semibold'}>{t('myProfile')}</p>
              </div>

              <img src={arrowRightSvg} alt="arrow-right" className={' pr-2'} />
            </Link>
          )}
        </div>

        <div
          className={
            'w-full h-full bg-white px-5 pt-[17px] pb-[75px] rounded-[15px_15px_0_0] shadow-[0px_4px_18px_0px_#E6E6E6]'
          }
        >
          {menuItems.map((item, key) => (
            <Link
              key={`${item.title}-${key}`}
              to={item.link}
              className={
                ' grid w-full h-[73px] grid-cols-[auto_1fr_auto] gap-5 items-center pl-[11px] pr-[6px] border-b border-[#DAD8D8] active:scale-95 transition'
              }
              onClick={onClose}
            >
              <img src={item.svg} alt={item.title} />

              <p className={'font-bold text-xl3'}>{item.title}</p>

              <img src={arrowRightSvg} alt="arrow-right" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideMenu
