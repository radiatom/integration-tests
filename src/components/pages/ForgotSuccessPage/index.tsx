import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import Header from '@/components/Header/Header'
import { trackEmail } from '@/helpers/facebookPixelEvents'
import useForgot from '@/hooks/useForgot'

const ForgotSuccessPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [email] = useState<string>(localStorage.getItem('userEmail') ?? '')
  const [timer, setTimer] = useState<number>(10)

  const { mutate: forgotPassword, isLoading } = useForgot(() => {
    trackEmail('forgot_password_web', email as string)
    setTimer(10)
  })

  const onSubmit = () => {
    forgotPassword({ email })
  }

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [timer])

  return (
    <div className="w-full relative py-5 px-4 flex flex-col pt-3  h-full overflow-y-auto overflow-x-hidden pb-20 justify-between">
      <div className="relative top-4 w-full">
        <Header showBtn={true} title={t('resetPassword')} onBackClick={() => navigate(-1)} />
      </div>

      <div>
        <h2 className="text-dark text-center font-bold text-xl3 mb-0 opacity-65">
          {t('recoveryEmailSentAt')}
        </h2>
        <h2 className="text-dark text-center font-bold text-xl3 pt-0 opacity-65 mb-4">{email}</h2>

        <p className="text-center">{t('pleaseCheckYourInbox')}</p>
      </div>

      <div>
        <Button
          type="submit"
          disabled={isLoading || timer > 0}
          className={`${isLoading || timer > 0 ? 'opacity-35 before:hidden' : ''} btn-large mb-7`}
          onClick={onSubmit}
        >
          <div className="h-[25px] flex items-center">
            {isLoading && <span className="spinner-button mt-[25px]" />}
            <span>{t('sendAgain')}</span>
            <span className="lowercase pl-2">{timer > 0 && `${timer}s`}</span>
          </div>
        </Button>

        <Button
          type="button"
          disabled={isLoading}
          className={`${isLoading ? 'opacity-35 before:hidden' : ''} btn-large`}
          onClick={() => navigate(-1)}
        >
          <div className="h-[25px] flex items-center">
            <span>{t('changeEmail')}</span>
          </div>
        </Button>
      </div>
    </div>
  )
}

export default ForgotSuccessPage
