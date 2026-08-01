import { getToken } from '../features/auth/auth.storage'

const baseUrl = import.meta.env.VITE_API_URL ?? 'https://localhost:7112/api'

/** status 0 = não houve resposta HTTP (API fora do ar, DNS, cert recusado). */
export class ApiError extends Error {
  readonly status: number
  readonly fieldErrors: Record<string, string[]>

  constructor(
    status: number,
    message: string,
    fieldErrors: Record<string, string[]> = {},
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

type UnauthorizedHandler = () => void

let onUnauthorized: UnauthorizedHandler = () => {}

/**
 * Permite que a camada de auth reaja a um 401 (sessão expirada) sem que este
 * módulo precise conhecer React ou o router.
 */
export function setUnauthorizedHandler(handler: UnauthorizedHandler): void {
  onUnauthorized = handler
}

interface ProblemDetails {
  mensagem?: string
  title?: string
  detail?: string
  errors?: Record<string, string[]>
}

function extractMessage(body: ProblemDetails | null, status: number): string {
  // `mensagem` é o formato dos erros de negócio do AuthController.
  if (body?.mensagem) return body.mensagem

  // ValidationProblemDetails: a mensagem útil está dentro de `errors`.
  const firstFieldError = body?.errors && Object.values(body.errors)[0]?.[0]
  if (firstFieldError) return firstFieldError

  if (body?.detail) return body.detail
  if (body?.title) return body.title

  return `Erro inesperado (HTTP ${status}).`
}

async function parseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.includes('json')) return null

  try {
    return await response.json()
  } catch {
    return null
  }
}

export async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken()
  const headers = new Headers(options.headers)

  headers.set('Accept', 'application/json')
  if (options.body !== undefined) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  let response: Response
  try {
    response = await fetch(`${baseUrl}${path}`, { ...options, headers })
  } catch {
    throw new ApiError(
      0,
      'Não foi possível conectar ao servidor. Verifique se a API está no ar.',
    )
  }

  const body = (await parseBody(response)) as ProblemDetails | null

  if (!response.ok) {
    // 401 só encerra a sessão quando havia token: um 401 vindo do próprio
    // login significa "credenciais erradas", não "sessão expirada".
    if (response.status === 401 && token) {
      onUnauthorized()
    }

    throw new ApiError(
      response.status,
      extractMessage(body, response.status),
      body?.errors ?? {},
    )
  }

  return body as T
}

export function post<T>(path: string, payload: unknown): Promise<T> {
  return request<T>(path, { method: 'POST', body: JSON.stringify(payload) })
}

export function put<T>(path: string, payload: unknown): Promise<T> {
  return request<T>(path, { method: 'PUT', body: JSON.stringify(payload) })
}

export function get<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'GET' })
}
