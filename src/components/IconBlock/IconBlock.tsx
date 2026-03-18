import React, { FC } from 'react'

interface IconBlockProps {
  icon: string
  alt: string
}

export const IconBlock: FC<IconBlockProps> = ({ icon, alt }) => {
  return (
    <div className="w-[104px] h-[104px] mx-auto p-3 rounded-[23px] border-2 border-green6 flex items-center justify-center">
      <img src={icon} alt={alt} width={56} height={56} className="w-[56px] h-[56px]" />
    </div>
  )
}
