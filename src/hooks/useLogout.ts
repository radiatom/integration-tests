import { useNavigate } from 'react-router-dom'
import { TokenService } from '@/services/TokenService'
import { ROUTES } from '@/constants/routes'

const useLogout = () => {
  const navigate = useNavigate()

  const logout = () => {
    TokenService.clearTokens()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return { logout }
}

export default useLogout
