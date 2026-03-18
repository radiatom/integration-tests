import Layout from '@/components/Layout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import Header from '@/components/Header/Header'
import { SUPPORT_EMAIL, UNSUBSCRIBE_LINK } from '@/constants/variables'
import { TokenService } from '@/services/TokenService'
import { getBrowserData } from '@/helpers/getBrowserData'

const HelpPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const browserData = getBrowserData()
  const subject = 'Support Request'
  const body = `Please do not delete the following data as it contains information needed to provide you with proper assistance.
  
user_id: ${localStorage.getItem('userId')}
created_on: web_app
browser: ${browserData.name}
browser_version: ${browserData.version}
`
  const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return (
    <Layout>
      <div className="overflow-y-auto min-h-full pb-4  overflow-x-hidden">
        <Header
          title={t('help')}
          onBackClick={() => navigate(ROUTES.APP_SETTINGS)}
          showBtn={true}
          isLastQuestion={false}
          fixed={true}
          withShadow={true}
        />
        <div className="px-4 pt-12">
          <div className=" bg-white rounded-r10 pl-4 ">
            <a
              href={mailtoUrl}
              target={'_blank'}
              className={'w-full py-4  flex items-center text-base1 border-b border-border1'}
              rel="noreferrer"
            >
              {t('support')}
            </a>

            <Link
              to={`${UNSUBSCRIBE_LINK}${TokenService.getRefreshToken()}`}
              className={'w-full py-4  flex items-center text-base1'}
            >
              {t('manageSubscription')}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default HelpPage
