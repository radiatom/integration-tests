import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SignInForm } from '@/components/pages/OtpPage/features/SignInForm'
import Header from '@/components/Header/Header'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { TABS } from '@/components/pages/ManageSubscriptionPage/ManageSubscriptionPage'

const OtpPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const emailAddress = sessionStorage.getItem('otp-email')

  return (
    <div className="w-full relative py-5 px-4 flex flex-col  h-full overflow-y-auto overflow-x-hidden pb-20">
      <Header
        showBtn={true}
        title={t('emailLogin')}
        onBackClick={() => {
          sessionStorage.setItem('activeTab', TABS.SUBSCRIPTIONS)
          navigate(ROUTES.PROFILE)
        }}
        isTransparent
      />

      <h2 className="text-dark relative text-xl4 text-center font-[550] pt-[33px] mb-0">
        {t('loginToFit4Me')}
      </h2>

      <p className="text-center mt-2 text-secondary">
        <Trans
          i18nKey="enter5DigitCode"
          values={{ email: emailAddress }}
          components={{
            bold: <span className="font-medium text-[#17181D]" />,
          }}
        />
      </p>

      <SignInForm />
    </div>
  )
}

export default OtpPage
