import React, { createContext, useContext, useEffect, useState } from 'react'
import { TokenService } from '@/services/TokenService'

interface AuthContextType {
  isAuthenticated: boolean
  userId: string | null
  isInitialized: boolean
  logout: () => void
  updateAuthState: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const checkAuth = () => {
    const hasTokens = TokenService.hasTokens()
    const currentUserId = TokenService.getUserId()

    setIsAuthenticated(hasTokens)
    setUserId(currentUserId)
    setIsInitialized(true)
  }

  useEffect(() => {
    checkAuth()

    TokenService.setAuthStateCallback(checkAuth)

    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      TokenService.setAuthStateCallback(null)
    }
  }, [])

  const logout = () => {
    TokenService.clearTokens()
    setIsAuthenticated(false)
    setUserId(null)
    setIsInitialized(true)
  }

  const updateAuthState = () => {
    checkAuth()
  }

  const value: AuthContextType = {
    isAuthenticated,
    userId,
    isInitialized,
    logout,
    updateAuthState,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
