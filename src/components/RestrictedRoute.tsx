import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthContext'
import { ROUTES } from '@/constants/routes'

interface RestrictedRouteProps {
  children: React.ReactNode
}

export const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth()

  if (!isInitialized) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.PLAN} replace />
  }

  return <>{children}</>
}
