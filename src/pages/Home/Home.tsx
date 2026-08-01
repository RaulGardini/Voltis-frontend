import { useNavigate } from 'react-router-dom'

// Extensão explícita: sem ela o resolver acha o SettingsMenu.ts (os estilos).
import { SettingsMenu } from '../../components/SettingsMenu/SettingsMenu.tsx'
import { useAuth } from '../../features/auth/useAuth'
import * as S from './Home'

export default function Home() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <S.Container>
      <SettingsMenu />

      <S.Card>
        <div>
          <S.Greeting>Olá, {user?.nome}</S.Greeting>
          <S.Email>{user?.email}</S.Email>
        </div>

        <S.Button type="button" onClick={handleLogout}>
          Sair
        </S.Button>
      </S.Card>
    </S.Container>
  )
}
