import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { TokenService } from '@/services/TokenService'
import useDeleteUser from '@/hooks/useDeleteUser'

// interface
export interface IModalProps {
  type: 'delete-data' | 'log-out'
  onClose: () => void
}

// component
const Modal: FC<Readonly<IModalProps>> = ({ onClose, type }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const idUser = localStorage.getItem('userId')

  const { mutate: deleteUserMutation, isLoading: loading } = useDeleteUser()

  const logout = () => {
    TokenService.clearTokens()
    navigate(ROUTES.LOGIN)
  }

  const deleteUser = () => {
    if (idUser) {
      deleteUserMutation(idUser)
    }
  }

  // return
  return (
    <div
      className={
        'grid items-center justify-items-center fixed top-0 left-0 w-full min-h-full bg-[rgba(41,41,58,0.23)] z-20'
      }
    >
      <div className={' w-[300px] min-h-[216px] rounded-[34px] bg-white shadow-lg overflow-hidden'}>
        <div
          className={
            ' top-0 left-0 w-full h-full rounded-[34px_30px_34px_30px] bg-gray backdrop-blur-md border border-white p-[14px]'
          }
        >
          <div className={'p-2 text-black'}>
            <h3 className={'text-base1 font-semibold mb-[10px]'}>
              {type === 'log-out' ? t('confirmLogout') : t('doYouWantToDeletePersonalData')}
            </h3>

            <p className={'text-base1 mb-[26px]'}>
              {type === 'log-out' ? t('loggingOutWillEndSession') : t('dataDeletionCannotBeUndone')}
            </p>
          </div>

          <div className={'grid grid-cols-[1fr_1fr] gap-4'}>
            <Button variant={'gray-bg-black-text'} onClick={onClose}>
              {t('cancel')}
            </Button>

            {type === 'log-out' ? (
              <Button variant={'gray-bg-red-text'} onClick={() => logout()}>
                {t('logOut')}
              </Button>
            ) : (
              <Button variant={'gray-bg-red-text'} onClick={() => deleteUser()} disabled={loading}>
                {t('deleteData')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
