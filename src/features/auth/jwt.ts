interface JwtPayload {
  exp?: number
  sub?: string
  email?: string
  nome?: string
}

/**
 * Lê o payload do JWT sem validar a assinatura.
 *
 * IMPORTANTE: isto serve APENAS para decisões de interface (ex: não exibir
 * a tela logada com um token que já venceu). O conteúdo do JWT é público e
 * pode ser forjado por quem controla o browser — a validação que vale é a
 * do servidor, em Program.cs (TokenValidationParameters).
 */
function decodePayload(token: string): JwtPayload | null {
  const segments = token.split('.')
  if (segments.length !== 3) return null

  try {
    const base64 = segments[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    const json = decodeURIComponent(
      atob(padded)
        .split('')
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join(''),
    )
    return JSON.parse(json) as JwtPayload
  } catch {
    return null
  }
}

/**
 * Id do usuário (claim `sub`, gravado pelo TokenService).
 *
 * Serve para montar rotas como /ConfiguracaoUsuario/{id}. Vale o mesmo aviso
 * de decodePayload: quem manda é o servidor, que revalida o token na API.
 */
export function getUserId(token: string): string | null {
  return decodePayload(token)?.sub ?? null
}

/** Momento (ms epoch) em que o token vence, ou null se indeterminado. */
export function getTokenExpiration(token: string): number | null {
  const exp = decodePayload(token)?.exp
  return typeof exp === 'number' ? exp * 1000 : null
}

/** Token sem `exp` legível é tratado como inválido (falha fechada). */
export function isTokenExpired(token: string): boolean {
  const expiresAt = getTokenExpiration(token)
  return expiresAt === null || expiresAt <= Date.now()
}
