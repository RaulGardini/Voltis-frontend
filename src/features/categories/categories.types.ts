/** Espelha Voltis.Domain/Entities/TipoMovimentacao.cs */
export const TIPO_ENTRADA = 'ENTRADA'
export const TIPO_SAIDA = 'SAIDA'

export type TipoMovimentacao = typeof TIPO_ENTRADA | typeof TIPO_SAIDA

/** Espelha Voltis.Api/DTOs/CategoriaResponse.cs */
export interface Categoria {
  categoriaId: number
  nome: string
  tipo: string
}

/** Espelha Voltis.Api/DTOs/CriarCategoriaRequest.cs */
export interface CriarCategoriaRequest {
  nome: string
  tipo: TipoMovimentacao
}
