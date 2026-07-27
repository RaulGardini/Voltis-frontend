import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../features/auth/useAuth'
import { ApiError } from '../../services/api'
import * as S from './Register'

/** Mesmo mínimo exigido pelo [MinLength(8)] do RegistrarRequest.cs. */
const SENHA_MIN_LENGTH = 8

export default function Register() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    // Validações locais só para dar retorno rápido. A regra que vale é a
    // do servidor (DataAnnotations), que roda de qualquer jeito.
    if (senha.length < SENHA_MIN_LENGTH) {
      setError(`A senha deve ter ao menos ${SENHA_MIN_LENGTH} caracteres.`)
      return
    }

    if (senha !== confirmarSenha) {
      setError('As senhas não conferem.')
      return
    }

    setLoading(true)

    try {
      await signUp({ nome, email, senha })
      navigate('/', { replace: true })
    } catch (err) {
      // 409 = email já cadastrado; 400 = validação do DTO.
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
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </S.Field>

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
              autoComplete="new-password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </S.Field>

          <S.Field>
            <S.Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </S.Field>

          {error && <S.ErrorMessage role="alert">{error}</S.ErrorMessage>}

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
