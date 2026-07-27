import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

import * as S from './Register'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não conferem.')
      return
    }

    setLoading(true)

    try {
      // TODO: chamar a API ASP.NET Core, ex.:
      // await api('/auth/register', {
      //   method: 'POST',
      //   body: JSON.stringify({ name, email, password }),
      // })
      console.log('register', { name, email, password })
    } catch {
      setError('Não foi possível criar a conta. Tente novamente.')
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
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </S.Field>

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
              autoComplete="new-password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </S.Field>

          <S.Field>
            <S.Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </S.Field>

          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

          <S.Button type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </S.Button>
        </S.Form>

        <S.Footer>
          Já tem conta? <Link to="/login">Entrar</Link>
        </S.Footer>
      </S.Card>
    </S.Container>
  )
}
