import { get, put } from '../../services/api'
import type {
  AtualizarConfiguracaoRequest,
  ConfiguracaoUsuario,
} from './settings.types'

// A rota vem de [Route("api/[controller]")] em ConfiguracaoUsuarioController.
const BASE = '/ConfiguracaoUsuario'

/** GET /api/ConfiguracaoUsuario/{usuarioId} — 404 se o usuário não tem registro. */
export function obterConfiguracao(
  usuarioId: string,
): Promise<ConfiguracaoUsuario> {
  return get<ConfiguracaoUsuario>(`${BASE}/${usuarioId}`)
}

/** PUT /api/ConfiguracaoUsuario/{usuarioId} — 400 em moeda ou dia inválidos. */
export function atualizarConfiguracao(
  usuarioId: string,
  payload: AtualizarConfiguracaoRequest,
): Promise<ConfiguracaoUsuario> {
  return put<ConfiguracaoUsuario>(`${BASE}/${usuarioId}`, payload)
}
