import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { OtpInput } from '@/components/pages/OtpPage/components/OtpInput'
import { Button } from '@/components/Button/Button'
import emptyLoader from '@/assets/images/svg/empty-loader-green.svg'
import { UserOtpInput } from '@/types/interfaces'
import { Trans, useTranslation } from 'react-i18next'
import { ResendCode } from '@/components/pages/OtpPage/components/ResendCode'
import { IsResentCode } from '@/components/pages/OtpPage/components/IsResentCode'
import { SUPPORT_EMAIL } from '@/constants/variables'
import useSignIn from '@/hooks/useSignIn'
import useOtp from '@/hooks/useOtp'
import { toast } from 'sonner'
import warningIcon from '@/assets/images/svg/warn.svg'
import crossIcon from '@/assets/images/svg/cross.svg'

export const SignInForm = () => {
  const { t } = useTranslation()
  const [isResentCode, setIsResentCode] = useState<boolean>(false)
  const [isOtpError, setIsOtpError] = useState<boolean>(false)

  const email = sessionStorage.getItem('otp-email') || ''

  const { mutate: sendEmailForOtp, isLoading: isLoadingSendEmail } = useOtp()
  const { mutate: signIn, isLoading } = useSignIn({
    onCustomError: () => {
      toast.custom(
        (id) => (
          <div className="flex items-center gap-3 w-full bg-white px-3 py-2 rounded-2xl shadow">
            <div className="rounded-r10 bg-[#FF3B30] p-2 shrink-0 flex items-center justify-center">
              <img src={warningIcon} alt="warning" width={20} height={20} />
            </div>
            <div className="font-outfit font-normal grow">
              <p className="text-[#FF3B30] leading-[140%]">{t('emailDoesntMatch')}</p>
              <p className="text-[14px] text-secondary leading-[160%]">{t('reCheck')}</p>
            </div>
            <button
              onClick={() => toast.dismiss(id)}
              className="w-8 h-8 shrink-0 flex items-center justify-center"
            >
              <img src={crossIcon} alt="cross icon" width={16} height={16} />
            </button>
          </div>
        ),
        {
          duration: 5000,
        },
      )
      setIsOtpError(true)
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm<UserOtpInput>({
    mode: 'onBlur',
    defaultValues: {
      code: ''.padEnd(5, ''),
    },
  })

  const onSendEmail = () => {
    setIsOtpError(false)
    reset({ code: ''.padEnd(5, '') })
    if (email) {
      sendEmailForOtp({ email })
      setIsResentCode(true)
    }
  }

  const onSubmit = (data: UserOtpInput) => {
    const userData = {
      email,
      code: data.code,
    }

    signIn(userData)
  }

  return (
    <form className="w-full flex flex-col shrink basis-auto mt-6" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="code"
        control={control}
        rules={{ required: true, minLength: 5 }}
        render={({ field }) => (
          <OtpInput
            length={5}
            value={field.value}
            onChange={field.onChange}
            inputClassName={isOtpError ? 'border-[2px] border-[#F99494]' : ''}
          />
        )}
      />

      <div className="mt-6 text-center text-secondary text-[14px]">
        {!isResentCode ? (
          <ResendCode onClick={onSendEmail} isLoading={isLoadingSendEmail} />
        ) : (
          <IsResentCode onClick={() => setIsResentCode(false)} />
        )}

        <div className="mt-4">
          <Trans
            i18nKey="contactSupport"
            components={{
              bold: (
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-green3 underline underline-offset-1 hover:opacity-70 transition duration-300"
                />
              ),
            }}
          />
        </div>
      </div>

      <Button
        disabled={!isValid || isLoading}
        type="submit"
        className={'mt-[26px] disabled:opacity-35'}
      >
        {isLoading && (
          <span className="inline-block mr-2 relative w-5 h-5">
            <img
              width={20}
              height={20}
              src={emptyLoader}
              alt="loader"
              className="animate-spin absolute top-2.5 left-2.5"
            />
          </span>
        )}

        {t('logIn')}
      </Button>
    </form>
  )
}
