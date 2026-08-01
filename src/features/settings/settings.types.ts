/**
 * Espelha Voltis.Domain/Entities/ConfiguracaoUsuario.MoedasPermitidas.
 * O servidor rejeita qualquer valor fora desta lista — aqui ela só monta
 * o <select> e evita uma ida à API que já se sabe que vai falhar.
 */
export const MOEDAS_PERMITIDAS = ['BRL', 'USD', 'EUR', 'JPY'] as const

export type Moeda = (typeof MOEDAS_PERMITIDAS)[number]

/** Espelha Voltis.Api/DTOs/ConfiguracaoUsuarioResponse.cs */
export interface ConfiguracaoUsuario {
  diaFechamentoMes: number
  moeda: string
}

/** Espelha Voltis.Api/DTOs/AtualizarConfiguracaoUsuarioRequest.cs */
export interface AtualizarConfiguracaoRequest {
  diaFechamentoMes: number
  moeda: string
}
