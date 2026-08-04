import { Outlet } from 'react-router-dom'

import { SettingsMenu } from '../components/SettingsMenu/SettingsMenu.tsx'

/**
 * Moldura das telas logadas. Existe para a engrenagem de configurações ser
 * montada uma vez só, e não copiada em cada página.
 *
 * Separado do PrivateRoute de propósito: aquele decide QUEM entra, este decide
 * COMO a tela é enquadrada.
 */
export function PrivateLayout() {
  return (
    <>
      <SettingsMenu />
      <Outlet />
    </>
  )
}
