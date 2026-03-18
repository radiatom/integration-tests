import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { TabItem } from '@/components/TabsList/types'

interface TabsListProps {
  list: TabItem[]
  activeTab: TabItem
  onChange: (item: TabItem) => void
}

export const TabsList: FC<TabsListProps> = ({ list, activeTab, onChange }) => {
  const { t } = useTranslation()

  return (
    <ul className="flex mt-8 rounded-[44px] p-1 bg-[rgba(0,0,0,0.03)]">
      {list.map((item) => (
        <li
          key={item}
          className={`flex-1 rounded-[44px] py-[9px] px-2 transition duration-300 text-center font-medium text-base ${activeTab === item ? 'bg-white text-green4' : 'text-secondary'}`}
          onClick={() => onChange(item)}
        >
          {t(item)}
        </li>
      ))}
    </ul>
  )
}
