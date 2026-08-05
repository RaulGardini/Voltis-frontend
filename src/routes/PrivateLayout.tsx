import { Outlet, useNavigate } from 'react-router-dom'

import { SettingsMenu } from '../components/SettingsMenu/SettingsMenu.tsx'
import { useAuth } from '../features/auth/useAuth'
import * as S from './PrivateLayout'

/**
 * Moldura das telas logadas: sair e configurações ficam aqui, montados uma
 * vez só, em vez de copiados em cada página.
 *
 * Separado do PrivateRoute de propósito: aquele decide QUEM entra, este
 * decide COMO a tela é enquadrada.
 */
export function PrivateLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <S.TopBar>
        <S.LogoutButton type="button" onClick={handleLogout}>
          Sair
        </S.LogoutButton>

        <SettingsMenu />
      </S.TopBar>

      <Outlet />
    </>
  )
}
