import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

import * as S from './Login'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      // TODO: chamar a API ASP.NET Core, ex.:
      // const data = await api<{ token: string }>('/auth/login', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, password }),
      // })
      console.log('login', { email, password })
    } catch {
      setError('Não foi possível entrar. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <S.Container>
      <S.Card>
        <S.Form onSubmit={handleSubmit}>
          <S.Field>
            <S.Input
              id="email"
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
              type="password"
              autoComplete="current-password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </S.Field>

          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

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
