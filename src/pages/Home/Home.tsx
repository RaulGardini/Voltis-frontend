import { useNavigate } from 'react-router-dom'

import * as S from './Home'

export default function Home() {
  const navigate = useNavigate()

  return (
    <S.Container>
      <S.TopBar>
        <S.AccountButton type="button" onClick={() => navigate('/contas')}>
          Conta bancária
        </S.AccountButton>
      </S.TopBar>
    </S.Container>
  )
}
