import Layout from '@/components/Layout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import Header from '@/components/Header/Header'

const AppSettingsPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Layout>
      <div className="overflow-y-auto min-h-full pb-4  overflow-x-hidden">
        <Header
          title={t('appSettings')}
          onBackClick={() => navigate(ROUTES.PLAN)}
          showBtn={true}
          fixed={true}
          withShadow={true}
        />
        <div className="px-4 pt-12">
          <div className=" bg-white rounded-r10 pl-4 ">
            <Link
              to={ROUTES.PERSONAL_DATA_MANAGEMENT}
              className={'w-full py-4  flex items-center text-base1 border-b border-border1'}
            >
              {t('personalDataManagement')}
            </Link>

            <Link to={ROUTES.HELP} className={'w-full py-4  flex items-center text-base1'}>
              {t('help')}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default AppSettingsPage
