import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../features/auth/useAuth'

/** Impede que quem já está logado veja login/registro. */
export function PublicOnlyRoute() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />
}
