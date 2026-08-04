/** Espelha Voltis.Api/DTOs/ContaResponse.cs */
export interface Conta {
  contaId: number
  nome: string
  /** ISO sem fuso — a coluna no banco é `timestamp without time zone`. */
  criadoEm: string
}

/** Espelha CriarContaRequest.cs e AtualizarContaRequest.cs (mesmo formato). */
export interface SalvarContaRequest {
  nome: string
}

/** Mesmo limite do [MaxLength] no DTO e do Conta.NomeTamanhoMaximo. */
export const CONTA_NOME_TAMANHO_MAXIMO = 100
