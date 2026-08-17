import { get, post } from '../../services/api'
import type {
  CriarMovimentacaoRequest,
  Movimentacao,
  ResumoMovimentacoes,
} from './movements.types'

const BASE = '/Movimentacao'

/** GET /api/Movimentacao?contaId=N — período corrente já somado e separado. */
export function obterResumo(contaId: number): Promise<ResumoMovimentacoes> {
  return get<ResumoMovimentacoes>(`${BASE}?contaId=${contaId}`)
}

/** POST /api/Movimentacao — o tipo é derivado da categoria escolhida. */
export function criarMovimentacao(
  payload: CriarMovimentacaoRequest,
): Promise<Movimentacao> {
  return post<Movimentacao>(BASE, payload)
}
