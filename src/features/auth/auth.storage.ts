import type { User } from './auth.types'
import { isTokenExpired } from './jwt'

const TOKEN_KEY = 'voltis.auth.token'
const USER_KEY = 'voltis.auth.user'

/**
 * Único ponto do app que sabe ONDE a sessão fica guardada.
 *
 * Hoje: localStorage. Isso sobrevive a refresh e a novas abas, mas é
 * legível por JavaScript — ou seja, um XSS consegue roubar o token.
 * A mitigação real é não ter XSS (React já escapa conteúdo por padrão;
 * evitar dangerouslySetInnerHTML e injeção de <script> de terceiros).
 *
 * Migração futura recomendada: a API passar o token em cookie httpOnly +
 * refresh token. Aí este arquivo é o único que muda no front.
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser(): User | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function saveSession(token: string, user: User): void {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

/**
 * Sessão persistida, já descartando token vencido. Usado na inicialização
 * para não renderizar a área logada com credencial morta.
 */
export function loadValidSession(): { token: string; user: User } | null {
  const token = getToken()
  const user = getUser()

  if (!token || !user || isTokenExpired(token)) {
    if (token || user) clearSession()
    return null
  }

  return { token, user }
}

/** Dispara quando outra aba altera a sessão (login/logout sincronizado). */
export function onSessionChangedInAnotherTab(handler: () => void): () => void {
  function listener(event: StorageEvent) {
    if (event.key === TOKEN_KEY || event.key === null) handler()
  }

  window.addEventListener('storage', listener)
  return () => window.removeEventListener('storage', listener)
}
