import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { setUnauthorizedHandler } from '../../services/api'
import { AuthContext } from './AuthContext'
import type { AuthContextValue } from './AuthContext'
import * as authService from './auth.service'
import {
  clearSession,
  loadValidSession,
  onSessionChangedInAnotherTab,
  saveSession,
} from './auth.storage'
import type { AuthResponse, LoginRequest, RegistrarRequest, User } from './auth.types'
import { getTokenExpiration } from './jwt'

interface SessionState {
  token: string
  user: User
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Inicializador lazy: lê o localStorage uma vez, de forma síncrona, antes
  // do primeiro render. Evita o flash de "deslogado" ao dar F5.
  const [session, setSession] = useState<SessionState | null>(loadValidSession)

  const signOut = useCallback(() => {
    clearSession()
    setSession(null)
  }, [])

  const applyAuthResponse = useCallback((response: AuthResponse) => {
    const user: User = { nome: response.nome, email: response.email }
    saveSession(response.token, user)
    setSession({ token: response.token, user })
  }, [])

  const signIn = useCallback(
    async (payload: LoginRequest) => {
      applyAuthResponse(await authService.login(payload))
    },
    [applyAuthResponse],
  )

  const signUp = useCallback(
    async (payload: RegistrarRequest) => {
      applyAuthResponse(await authService.registrar(payload))
    },
    [applyAuthResponse],
  )

  // Um 401 em qualquer chamada autenticada derruba a sessão local. Sem isto,
  // a interface continuaria "logada" batendo em erro a cada requisição.
  useEffect(() => {
    setUnauthorizedHandler(signOut)
    return () => setUnauthorizedHandler(() => {})
  }, [signOut])

  // Logout automático no vencimento do token (2h, definido no TokenService).
  useEffect(() => {
    if (!session) return

    const expiresAt = getTokenExpiration(session.token)
    if (expiresAt === null) {
      signOut()
      return
    }

    // setTimeout satura acima de ~24.8 dias; o token é de 2h, então o clamp
    // é só uma proteção contra valor absurdo vindo do servidor.
    const delay = Math.min(Math.max(expiresAt - Date.now(), 0), 2_147_483_647)
    const timer = window.setTimeout(signOut, delay)

    return () => window.clearTimeout(timer)
  }, [session, signOut])

  // Logout em uma aba derruba as demais.
  useEffect(
    () => onSessionChangedInAnotherTab(() => setSession(loadValidSession())),
    [],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      isAuthenticated: session !== null,
      signIn,
      signUp,
      signOut,
    }),
    [session, signIn, signUp, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
