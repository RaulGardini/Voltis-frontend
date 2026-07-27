import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../features/auth/useAuth'

/**
 * Guarda de UX, não de segurança: só esconde telas. O que protege dado de
 * verdade é o [Authorize] na API — o browser é território do usuário.
 */
export function PrivateRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // `from` permite voltar à página pretendida depois do login.
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
