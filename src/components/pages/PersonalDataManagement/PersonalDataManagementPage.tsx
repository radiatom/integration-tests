import Header from '@/components/Header/Header'
import Layout from '@/components/Layout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Modal from '@/components/pages/PersonalDataManagement/components/Modal'

const PersonalDataManagementPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [openModalType, setOpenModalType] = useState<null | 'delete-data' | 'log-out'>(null)

  return (
    <Layout>
      <div className="overflow-y-auto min-h-full pb-4  overflow-x-hidden">
        <Header
          title={t('personalDataManagement')}
          onBackClick={() => navigate(-1)}
          showBtn={true}
          fixed={true}
          withShadow={true}
        />
        <div className="px-4 pt-12">
          <div className=" bg-white rounded-r10 pl-4 ">
            <ul className="flex flex-col text-[#FF3B30]">
              <li className={'w-full'}>
                <button
                  onClick={() => setOpenModalType('delete-data')}
                  className={'w-full py-4 border-b border-border1 flex items-center text-base1'}
                >
                  {t('deletePersonalData')}
                </button>
              </li>

              <li className={'w-full'}>
                <button
                  onClick={() => setOpenModalType('log-out')}
                  className={'w-full py-4 border-b border-none flex items-center text-base1'}
                >
                  {t('logOut')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {openModalType && <Modal type={openModalType} onClose={() => setOpenModalType(null)} />}
    </Layout>
  )
}
export default PersonalDataManagementPage
