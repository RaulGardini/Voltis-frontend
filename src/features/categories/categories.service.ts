import { get, post } from '../../services/api'
import type { Categoria, CriarCategoriaRequest } from './categories.types'

const BASE = '/Categoria'

/** GET /api/Categoria — categorias do usuário logado, agrupáveis por tipo. */
export function listarCategorias(): Promise<Categoria[]> {
  return get<Categoria[]>(BASE)
}

/** POST /api/Categoria — 400 se o tipo não for ENTRADA ou SAIDA. */
export function criarCategoria(
  payload: CriarCategoriaRequest,
): Promise<Categoria> {
  return post<Categoria>(BASE, payload)
}
