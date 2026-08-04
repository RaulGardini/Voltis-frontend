import { get, put } from '../../services/api'
import type {
  AtualizarConfiguracaoRequest,
  ConfiguracaoUsuario,
} from './settings.types'

// A rota vem de [Route("api/[controller]")] em ConfiguracaoUsuarioController.
// Sem id na URL: o servidor identifica o usuário pelo token que o `request`
// já anexa no cabeçalho Authorization.
const BASE = '/ConfiguracaoUsuario'

/** GET /api/ConfiguracaoUsuario — 401 sem token, 404 se não há registro. */
export function obterConfiguracao(): Promise<ConfiguracaoUsuario> {
  return get<ConfiguracaoUsuario>(BASE)
}

/** PUT /api/ConfiguracaoUsuario — 400 em moeda ou dia inválidos. */
export function atualizarConfiguracao(
  payload: AtualizarConfiguracaoRequest,
): Promise<ConfiguracaoUsuario> {
  return put<ConfiguracaoUsuario>(BASE, payload)
}
