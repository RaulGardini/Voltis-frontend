import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../../features/auth/useAuth'
import { ApiError } from '../../services/api'
import * as S from './Login'

interface LocationState {
  from?: { pathname: string }
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Volta para a página que o usuário tentou abrir antes de ser barrado.
  const from = (location.state as LocationState | null)?.from?.pathname ?? '/'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn({ email, senha })
      navigate(from, { replace: true })
    } catch (err) {
      // A API responde a mesma mensagem para email inexistente e senha
      // errada, de propósito. Repassar o texto dela preserva isso.
      setError(
        err instanceof ApiError
          ? err.message
          : 'Erro inesperado. Tente novamente.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <S.Container>
      <S.Card>
        <S.Form onSubmit={handleSubmit} noValidate>
          <S.Field>
            <S.Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </S.Field>

          <S.Field>
            <S.Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </S.Field>

          {error && <S.ErrorMessage role="alert">{error}</S.ErrorMessage>}

          <S.Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </S.Button>
        </S.Form>

        <S.Footer>
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </S.Footer>
      </S.Card>
    </S.Container>
  )
}
