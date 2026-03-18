import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { UserFormInput } from '@/types/interfaces'
import { Button } from '@/components/Button/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import useValidationMessages from '@/hooks/useValidationMessages'
import useOtp from '@/hooks/useOtp'
import { updateSentryUser } from '@/services/analytics/sentry-init'

import logo from '@/assets/images/logo.svg'
import emptyLoader from '@/assets/images/svg/empty-loader.svg'

const LoginPage = () => {
  const { t } = useTranslation()
  const validationErrors = useValidationMessages()

  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required(validationErrors.requiredEmail)
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, validationErrors.invalidEmail),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserFormInput>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const { mutate: sendEmailForOtp, isLoading } = useOtp()
  const onSubmit = (data: { email: string }) => {
    const userData = { email: data.email }

    sendEmailForOtp(userData)
  }

  useEffect(() => {
    updateSentryUser({})
  }, [])

  return (
    <div className="w-full relative py-5 px-4 flex flex-col pt-3  h-full overflow-y-auto overflow-x-hidden pb-20">
      <div className="mt-3 pt-1">
        <img
          className="max-w-40 w-full mx-auto mt-8"
          width="156"
          height="27"
          src={logo}
          alt="logo"
        />
      </div>

      <h2 className="text-dark relative font-outfit text-xl2 text-center font-semibold pt-5 mb-0">
        {t('loginLabel')}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col shrink basis-auto mt-[34px]"
      >
        <div className="relative w-full">
          <div className="relative w-full">
            <input
              type="email"
              {...register('email')}
              id="email"
              placeholder=" "
              className={`peer text-xl2 bg-inputBg shadow-input rounded-2xl px-5 pt-2 pb-2 h-[72px] w-full 
                  placeholder-transparent focus-visible:outline-none font-outfit font-semibold leading-[150%] focus:pt-[32px] [&:not(:placeholder-shown)]:pt-[32px] ${errors.email ? 'border-mark' : ''}`}
            />
            <label
              htmlFor="email"
              className="absolute font-outfit font-normal m-0 left-5 text-[#9EA1AD] transition-all duration-200
               top-1/2 -translate-y-1/2 text-[20px] leading-[30px]

               {/* empty input */}
               peer-placeholder-shown:top-1/2 
               peer-placeholder-shown:text-[20px] 
               peer-placeholder-shown:text-[#9EA1AD]/60 
               peer-placeholder-shown:-translate-y-1/2 

               {/* with text filled */}
               peer-[:not(:placeholder-shown)]:top-2
               peer-[:not(:placeholder-shown)]:text-[14px]
               peer-[:not(:placeholder-shown)]:translate-y-0
               peer-[:not(:placeholder-shown)]:text-[#9EA1AD]

               {/* with focus*/}
               peer-focus:top-2 
               peer-focus:text-[14px]
               peer-focus:translate-y-0 
               peer-focus:text-[#9EA1AD]"
            >
              Email
            </label>
          </div>

          {errors.email && (
            <p className="absolute text-mark block text-xs3 font-semibold text-left ml-2">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mt-7">
          <Button disabled={!isValid || isLoading} type="submit" className={'disabled:opacity-35'}>
            {isLoading ? (
              <>
                <span className="inline-block mr-2 relative w-5 h-5">
                  <img
                    width={20}
                    height={20}
                    src={emptyLoader}
                    alt="loader"
                    className="animate-spin absolute top-2.5 left-2.5"
                  />
                </span>
                {t('checkingYouEmail')}
              </>
            ) : (
              t('logIn')
            )}
          </Button>
        </div>
      </form>

      <p className="mt-[23px] text-center text-xs  leading-[140%] font-outfit px-9 text-secondary">
        <Trans
          i18nKey="agreePrivacyPolicy"
          components={{
            privacy: (
              <Link
                to="/privacy-policy"
                className="text-green underline underline-offset-2 transition hover:text-[#1AC760]/70 cursor-pointer"
              />
            ),
            terms: (
              <Link
                to="/terms"
                className="text-green underline underline-offset-2 transition hover:text-[#1AC760]/70 cursor-pointer"
              />
            ),
          }}
        />
      </p>
    </div>
  )
}

export default LoginPage
