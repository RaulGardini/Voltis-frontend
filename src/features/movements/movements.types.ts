/** Espelha Voltis.Api/DTOs/MovimentacaoResponse.cs */
export interface Movimentacao {
  movimentacaoId: number
  descricao: string
  valor: number
  tipo: string
  data: string
  /** null quando a categoria foi apagada depois do lançamento. */
  categoria: string | null
}

/** Espelha Voltis.Api/DTOs/ResumoMovimentacoesResponse.cs */
export interface ResumoMovimentacoes {
  periodoInicio: string
  periodoFim: string
  totalEntradas: number
  totalSaidas: number
  saldo: number
  entradas: Movimentacao[]
  saidas: Movimentacao[]
}

/** Espelha Voltis.Api/DTOs/CriarMovimentacaoRequest.cs */
export interface CriarMovimentacaoRequest {
  contaId: number
  categoriaId: number
  descricao: string
  valor: number
}
