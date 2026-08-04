import { useNavigate } from 'react-router-dom'

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
      <S.Card>
        <div>
          <S.Greeting>Olá, {user?.nome}</S.Greeting>
          <S.Email>{user?.email}</S.Email>
        </div>

        <S.Actions>
          <S.Button type="button" onClick={() => navigate('/contas')}>
            Conta bancária
          </S.Button>

          <S.GhostButton type="button" onClick={handleLogout}>
            Sair
          </S.GhostButton>
        </S.Actions>
      </S.Card>
    </S.Container>
  )
}
