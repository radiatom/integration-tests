import React, { FC } from 'react'
import Header from '@/components/Header/Header'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import { FastingModel } from '@/components/pages/FastingPage/types/index.types'

// interface
interface IInfoModelProps {
  isOpen: boolean
  onClose: () => void
  activeModel: FastingModel
  onAction?: () => void
}

// component
const InfoModel: FC<Readonly<IInfoModelProps>> = ({ isOpen, onClose, activeModel, onAction }) => {
  const { t } = useTranslation()

  // return
  return (
    <div
      className={`${isOpen ? 'translate-x-0' : 'translate-x-full'}  fixed top-0 right-0 h-full w-full z-40 bg-[#f9fafb] border border-gray transition-all duration-300 flex flex-col`}
    >
      <div className={'max-w-content mx-auto'}>
        <Header
          title={
            onAction ? `${activeModel.fastingDuration}:${activeModel.eatingDuration}` : t('info')
          }
          onBackClick={onClose}
          showBtn={true}
          fixed={true}
          withShadow={false}
          isTransparent={true}
        />

        <div
          className={
            'grid py-6 px-[18px] grid-rows-[auto_1fr] h-full  overflow-y-auto overflow-x-hidden'
          }
        >
          <div>
            <p className={'font-semibold text-gray9 text-md mb-5'}>{activeModel.description}</p>

            <ul>
              <p className={'uppercase font-semibold text-md mb-[17px]'}>{activeModel.listTitle}</p>

              {activeModel.list.map((item, key) => (
                <li
                  key={`${item} ${key} li`}
                  className={
                    "relative pl-[26px] mb-[17px] font-semibold text-md before:content-[''] before:absolute before:left-[7px] before:top-1/2 before:-translate-y-1/2 before:w-[11px] before:h-[11px] before:bg-[#0038FF] before:rounded-full"
                  }
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={'grid h-full items-end'}>
            {onAction && <Button onClick={onAction}>{t('choose')}</Button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoModel
