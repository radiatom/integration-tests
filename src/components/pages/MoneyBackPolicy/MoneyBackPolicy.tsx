import Header from '@/components/Header/Header'
import Layout from '@/components/Layout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  MoneyBackPolicyEn,
  MoneyBackPolicyDe,
  MoneyBackPolicyEs,
  MoneyBackPolicyFr,
  MoneyBackPolicyPt,
} from './components'

export function MoneyBackPolicy() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const BackToHomePage = () => {
    navigate(-1)
  }

  const config = {
    en: <MoneyBackPolicyEn />,
    es: <MoneyBackPolicyEs />,
    de: <MoneyBackPolicyDe />,
    pt: <MoneyBackPolicyPt />,
    fr: <MoneyBackPolicyFr />,
    uk: <MoneyBackPolicyEn />,
  }

  return (
    <>
      <Layout>
        <div className="overflow-y-auto h-full pb-4 overflow-x-hidden">
          <Header
            title={t('moneyToBack')}
            onBackClick={BackToHomePage}
            showBtn={true}
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
