import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useProfile from '@/hooks/useProfile'
import { ROUTES } from '@/constants/routes'
import { updateSentryUser } from '@/services/analytics/sentry-init'
import Layout from '@/components/Layout'
import Avatar from '@/components/Avatar/Avatar'
import { Loader } from '@/components/Loader/Loader'
import Header from '@/components/Header/Header'

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { data, isLoading } = useProfile()

  useEffect(() => {
    if (data) {
      updateSentryUser({
        ...(data.id && { id: data.id }),
        ...(data.email && { email: data.email }),
        ...(data.userName && { username: data.userName }),
      })
    }
  }, [data])

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative overflow-y-auto min-h-full w-full  flex flex-col h-full overflow-x-hidden  pb-2 ">
          <Header
            title={t('profile')}
            onBackClick={() => navigate(ROUTES.PLAN)}
            showBtn={true}
            isLastQuestion={false}
            fixed={true}
          />

          <div className="bg-white rounded-b-[25px] mt-[-40px] p-8 pt-16">
            {data && (
              <div className="flex flex-col items-center w-full ">
                <Avatar linkImg={data.avatar} name={data.userName} classNameWrapper={' shrink-0'} />

                <h3 className="font-outfit min-h-7 mt-3 font-semibold text-center transition-all duration-300 text-xl2 ">
                  {data.userName}
                </h3>
                <h4 className={'text-md  text-[#B3C1CD] '}>{data.email}</h4>
              </div>
            )}
          </div>

          <div className="mt-4 bg-white rounded-r10 pl-4 mx-4">
            <ul className="flex flex-col ">
              {data?.profileItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-base1 justify-between py-4 border-b border-border1 last:border-none"
                >
                  <label className="m-0 font-outfit font-normal  leading-[160%]">
                    {item.label}
                  </label>
                  <p className=" text-[#B3C1CD] pr-4">{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default ProfilePage
