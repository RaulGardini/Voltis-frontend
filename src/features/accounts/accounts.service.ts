import { get, post, put } from '../../services/api'
import type { Conta, SalvarContaRequest } from './accounts.types'

// Rota de [Route("api/[controller]")] em ContaController. O usuário dono vem
// sempre do token, nunca da URL.
const BASE = '/Conta'

/** GET /api/Conta — contas do usuário logado, da mais antiga para a mais nova. */
export function listarContas(): Promise<Conta[]> {
  return get<Conta[]>(BASE)
}

/** POST /api/Conta — 400 se o nome vier vazio ou acima de 100 caracteres. */
export function criarConta(payload: SalvarContaRequest): Promise<Conta> {
  return post<Conta>(BASE, payload)
}

/** PUT /api/Conta/{contaId} — 404 se a conta não for do usuário logado. */
export function atualizarConta(
  contaId: number,
  payload: SalvarContaRequest,
): Promise<Conta> {
  return put<Conta>(`${BASE}/${contaId}`, payload)
}
