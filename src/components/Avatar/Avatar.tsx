import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ImageComponent from '@/components/ImageComponent/ImageComponent'

// interface
interface IAvatarProps {
  linkImg?: string | null
  name: string
  classNameWrapper?: string
  isSmall?: boolean
}

// component
const Avatar: FC<Readonly<IAvatarProps>> = ({ linkImg, classNameWrapper, name, isSmall }) => {
  const { t } = useTranslation()
  const className = isSmall ? 'h-[40px] w-[40px] text-xl2' : 'h-[86px] w-[86px] text-xl6'

  // return
  return (
    <div className={classNameWrapper}>
      {linkImg ? (
        <ImageComponent
          src={linkImg}
          alt={t('avatar')}
          className={`rounded-full object-cover max-w-full max-h-full ${className}`}
        />
      ) : (
        <div
          className={`grid max-w-full max-h-full items-center justify-center rounded-full bg-green object-cover capitalize ${className} text-white`}
        >
          {name[0]}
        </div>
      )}
    </div>
  )
}

export default Avatar
