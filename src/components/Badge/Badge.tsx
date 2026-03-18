import React, { FC } from 'react'

// interface
interface IBadgeProps {
  text: string
  classNameWrapper?: string
}

// component
const Badge: FC<Readonly<IBadgeProps>> = ({ classNameWrapper, text }) => {
  // return
  return (
    <div className={classNameWrapper}>
      <p className={'py-px px-[6px] rounded-[6px] bg-green text-white text-md capitalize'}>
        {text}
      </p>
    </div>
  )
}

export default Badge
