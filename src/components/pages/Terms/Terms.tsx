import Layout from '@/components/Layout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { TermsDe, TermsEn, TermsEs, TermsPt, TermsFr } from './components'
import Header from '@/components/Header/Header'

export function Terms() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const BackToHomePage = () => {
    navigate(-1)
  }

  const config = {
    en: <TermsEn />,
    es: <TermsEs />,
    de: <TermsDe />,
    pt: <TermsPt />,
    fr: <TermsFr />,
    uk: <TermsEn />,
  }

  return (
    <>
      <Layout>
        <div className="overflow-y-auto h-full pb-4 pt-0 overflow-x-hidden">
          <Header
            title={t('terms')}
            onBackClick={BackToHomePage}
            showBtn={true}
            isLastQuestion={false}
            fixed={true}
          />
          <div className="px-4 [&>h1]:pt-6 [&>h1+p]:!mt-2 [&>h1]:mb-4 [&>h1]:text-xl2 [&>h1]:font-bold [&>p]:mt-6 [&>p>a]:text-green  [&>*]:text-left [&>ul]:mt-6 text-light [&>h2]:pt-6 [&>h2+p]:!mt-2  [&>h2+ul]:!mt-2 [&>h2]:mb-4 [&>h2]:text-xl2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mt-2">
            {config[i18n.language]}
          </div>
        </div>
      </Layout>
    </>
  )
}
