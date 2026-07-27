import { post } from '../../services/api'
import type { AuthResponse, LoginRequest, RegistrarRequest } from './auth.types'

/** POST /api/auth/login — 401 em credenciais inválidas. */
export function login(payload: LoginRequest): Promise<AuthResponse> {
  return post<AuthResponse>('/auth/login', payload)
}

/** POST /api/auth/registrar — 409 se o email já existe, 400 se inválido. */
export function registrar(payload: RegistrarRequest): Promise<AuthResponse> {
  return post<AuthResponse>('/auth/registrar', payload)
}
