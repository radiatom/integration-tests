import React, { FC } from 'react'
import { ProfileItem } from '@/types/interfaces'

interface IProfileInfo {
  items?: ProfileItem[]
}

export const Profile: FC<IProfileInfo> = ({ items }) => {
  return (
    <ul className="flex flex-col px-4">
      {items?.map((item, index) => (
        <li
          key={index}
          className="flex items-center justify-between py-[13px] border-b border-border1"
        >
          <label className="m-0 font-outfit text-[14px] font-normal text-secondary leading-[160%]">
            {item.label}
          </label>
          <p className="font-medium">{item.value}</p>
        </li>
      ))}
    </ul>
  )
}
