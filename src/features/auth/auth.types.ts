/** Espelha Voltis.Api/DTOs/AuthResponse.cs */
export interface AuthResponse {
  token: string
  nome: string
  email: string
}

/** Espelha Voltis.Api/DTOs/LoginRequest.cs */
export interface LoginRequest {
  email: string
  senha: string
}

/** Espelha Voltis.Api/DTOs/RegistrarRequest.cs */
export interface RegistrarRequest {
  nome: string
  email: string
  senha: string
}

/** Dados do usuário mantidos no cliente. Nunca inclui token nem senha. */
export interface User {
  nome: string
  email: string
}
