import { createContext } from 'react'

import type { LoginRequest, RegistrarRequest, User } from './auth.types'

export interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  signIn: (payload: LoginRequest) => Promise<void>
  signUp: (payload: RegistrarRequest) => Promise<void>
  signOut: () => void
}

/**
 * Separado do provider de propósito: um arquivo que exporta componente E
 * valor não-componente quebra o Fast Refresh do Vite.
 */
export const AuthContext = createContext<AuthContextValue | null>(null)
