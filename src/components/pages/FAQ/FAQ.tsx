import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import arrow from '@/assets/images/accordion-arrow.svg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SUPPORT_LINK } from '@/constants/support-link'
import Header from '@/components/Header/Header'
import Layout from '@/components/Layout'

export function FAQ() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <Layout>
        <div className="overflow-y-auto min-h-full pb-4 pt-0 overflow-x-hidden">
          <Header title="FAQs" onBackClick={() => navigate(-1)} showBtn={true} fixed={true} />
          <Accordion type="single" collapsible className={'px-4'}>
            <AccordionItem className="border-b border-border  mt-7" value="item-1">
              <AccordionTrigger className="flex-1 py-4 transition-all  [&[data-state=open]>img]:rotate-180 text-base font-semibold w-full flex items-center justify-between text-left">
                {t('howDoISignUp')}?
                <img
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ml-4"
                  src={arrow}
                  alt="arrow"
                />
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-7 text-left text-light text-md">
                  {t('getStartedWorkoutPlanEmailReminder')}
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-b border-border mt-7" value="item-2">
              <AccordionTrigger className="flex-1  py-4 transition-all  [&[data-state=open]>img]:rotate-180 text-base font-semibold w-full flex items-center justify-between text-left">
                {t('howWillIReceiveMyCustomizedMealAndWorkoutPlan')}?
                <img
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ml-4"
                  src={arrow}
                  alt="arrow"
                />
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-7 text-left text-light text-md">
                  {t('appDownloadAndAccessInstructions')}{' '}
                  <span className="transition-all hover:text-green">{SUPPORT_LINK}</span>.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-b border-border mt-7" value="item-3">
              <AccordionTrigger className="flex-1 py-4 transition-all  [&[data-state=open]>img]:rotate-180 text-base font-semibold w-full flex items-center justify-between text-left">
                {t('planReceiveTime')}?
                <img
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ml-4"
                  src={arrow}
                  alt="arrow"
                />
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-7 text-left text-light text-md">{t('planGenerationDetails')}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-b border-border mt-7" value="item-4">
              <AccordionTrigger className="flex-1 py-4 transition-all  [&[data-state=open]>img]:rotate-180 text-base font-semibold w-full flex items-center justify-between text-left">
                {t('freeTrialQuestion')}?
                <img
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ml-4"
                  src={arrow}
                  alt="arrow"
                />
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-7 text-left text-light text-md">{t('freeTrialInfo')}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-b border-border mt-7" value="item-5">
              <AccordionTrigger className="flex-1 py-4 transition-all  [&[data-state=open]>img]:rotate-180 text-base font-semibold w-full flex items-center justify-between text-left">
                {t('billingQuestion')}?
                <img
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ml-4"
                  src={arrow}
                  alt="arrow"
                />
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-7 text-left text-light text-md">{t('billingInfo')}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-b border-border mt-7" value="item-6">
              <AccordionTrigger className="flex-1 py-4 transition-all  [&[data-state=open]>img]:rotate-180 text-base font-semibold w-full flex items-center justify-between text-left">
                {t('cancelSubscriptionQuestion')}?
                <img
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ml-4"
                  src={arrow}
                  alt="arrow"
                />
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-7 text-left text-light text-md">
                  {t('cancelSubscriptionInfo')}:{' '}
                  <span className="transition-all hover:text-green">{SUPPORT_LINK}</span>.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-b border-border mt-7" value="item-7">
              <AccordionTrigger className="flex-1  py-4 transition-all  [&[data-state=open]>img]:rotate-180 text-base font-semibold w-full flex items-center justify-between text-left">
                {t('noAccessQuestion')}?
                <img
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ml-4"
                  src={arrow}
                  alt="arrow"
                />
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-7 text-left text-light text-md">{t('noAccessInfo')}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Layout>
    </>
  )
}
