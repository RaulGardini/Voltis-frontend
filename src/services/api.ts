const baseUrl = import.meta.env.VITE_API_URL ?? 'https://localhost:7001'

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao chamar ${path}`)
  }

  return (await response.json()) as T
}
