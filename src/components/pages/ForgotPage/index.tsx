import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { Forgot } from '@/types/interfaces'
import { Button } from '@/components/Button/Button'
import Header from '@/components/Header/Header'
import { trackEmail } from '@/helpers/facebookPixelEvents'
import { yupResolver } from '@hookform/resolvers/yup'
import useValidationMessages from '@/hooks/useValidationMessages'
import Notification from '@/components/Notification/Notification'
import useForgot from '@/hooks/useForgot'

const ForgotPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const validationErrors = useValidationMessages()

  const [registerErrors, setRegisterErrors] = useState<string>('')
  const [isPaymentFailed, setIsPaymentFailed] = useState<boolean>(false)

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
    watch,
    formState: { errors },
  } = useForm<Forgot>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const inputClasses =
    'text-base rounded-xl p-3 border border-borderInput bg-transparent w-full placeholder:text-dark focus-visible:outline-none placeholder:opacity-30'

  const email = watch('email')

  const {
    mutate: forgotPassword,
    isLoading,
    error,
  } = useForgot(() => {
    trackEmail('forgot_password_web', email as string)
    navigate('/forgot-success')
  })

  const onSubmit = (data: Forgot) => {
    forgotPassword({ email: data.email })
  }

  useEffect(() => {
    if (error?.message) {
      setRegisterErrors(error?.message)
      setIsPaymentFailed(true)
    }
  }, [error])

  const isValid = !!email && !errors.email && !isLoading

  return (
    <div className="w-full relative py-5 px-4 flex flex-col pt-3  h-full overflow-y-auto overflow-x-hidden pb-20">
      <div className="relative top-4 w-full">
        <Header showBtn={true} title={t('resetPassword')} onBackClick={() => navigate(-1)} />
      </div>

      <h2 className="text-dark relative text-center font-normal pt-8 mb-1">{t('labelForgot')}</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col shrink grow basis-auto mt-4"
      >
        <label className="font-normal mt-0 mb-2">{t('email')}</label>
        <input
          className={`${errors.email ? 'border-mark' : ''} ${inputClasses}`}
          {...register('email')}
          placeholder={t('placeholderEmail')}
        />
        {errors.email && (
          <p className="text-mark block text-xs3 font-semibold text-left">{errors.email.message}</p>
        )}

        <div className={'text-mark block mt-1 text-xs font-normal text-left'}>{registerErrors}</div>

        <div className="pt-10">
          <Button
            type="submit"
            disabled={!isValid}
            className={`${!isValid ? 'opacity-35 before:hidden' : ''} btn-large`}
          >
            <div className="h-[25px] flex items-center">
              {isLoading && <span className="spinner-button mt-[25px]" />}
              <span>{t('continue')}</span>
            </div>
          </Button>
        </div>
      </form>

      <Notification
        state={isPaymentFailed}
        handleResetNotification={() => setIsPaymentFailed(false)}
        className="success fixed top-6 max-w-content w-full px-4 left-1/2 -translate-x-1/2 transition-al duration-300"
      >
        <div
          className={
            'w-full py-2 px-6 text-center flex flex-col items-center justify-center bg-gradient text-white rounded-xl'
          }
        >
          <label className={'m-0'}>{t('wrongEmail')}</label>
          <p>{t('doubleCheckAndRetry')}</p>
        </div>
      </Notification>
    </div>
  )
}

export default ForgotPage
