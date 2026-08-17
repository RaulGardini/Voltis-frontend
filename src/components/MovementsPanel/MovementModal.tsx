import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

import {
  criarCategoria,
  listarCategorias,
} from '../../features/categories/categories.service'
import type { Categoria, TipoMovimentacao } from '../../features/categories/categories.types'
import {
  TIPO_ENTRADA,
  TIPO_SAIDA,
} from '../../features/categories/categories.types'
import { criarMovimentacao } from '../../features/movements/movements.service'
import { useDismiss } from '../../hooks/useDismiss'
import { ApiError } from '../../services/api'
import * as S from './MovementModal'

function mensagemDeErro(err: unknown, fallback: string): string {
  return err instanceof ApiError ? err.message : fallback
}

interface Props {
  contaId: number
  onFechar: () => void
  /** Chamado após criar: a tela recarrega os totais e as listas. */
  onCriada: () => void
}

export function MovementModal({ contaId, onFechar, onCriada }: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [categoriaId, setCategoriaId] = useState('')
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  // Criação de categoria acontece aqui dentro: um segundo modal por cima do
  // primeiro seria pior de usar e de fechar.
  const [criandoCategoria, setCriandoCategoria] = useState(false)
  const [nomeCategoria, setNomeCategoria] = useState('')
  const [tipoCategoria, setTipoCategoria] = useState<TipoMovimentacao>(TIPO_SAIDA)

  const modalRef = useRef<HTMLDivElement>(null)
  const fechar = useCallback(() => onFechar(), [onFechar])
  useDismiss(modalRef, fechar, true)

  useEffect(() => {
    let cancelado = false

    listarCategorias()
      .then((lista) => {
        if (!cancelado) setCategorias(lista)
      })
      .catch((err: unknown) => {
        if (!cancelado) {
          setErro(mensagemDeErro(err, 'Não foi possível carregar as categorias.'))
        }
      })

    return () => {
      cancelado = true
    }
  }, [])

  const entradas = categorias.filter((c) => c.tipo === TIPO_ENTRADA)
  const saidas = categorias.filter((c) => c.tipo === TIPO_SAIDA)

  async function handleCriarCategoria() {
    const nome = nomeCategoria.trim()
    if (!nome) {
      setErro('O nome da categoria é obrigatório.')
      return
    }

    setErro('')
    setSalvando(true)

    try {
      const nova = await criarCategoria({ nome, tipo: tipoCategoria })
      setCategorias([...categorias, nova])
      // Já deixa selecionada: foi para usar agora que ela foi criada.
      setCategoriaId(String(nova.categoriaId))
      setCriandoCategoria(false)
      setNomeCategoria('')
    } catch (err) {
      setErro(mensagemDeErro(err, 'Não foi possível criar a categoria.'))
    } finally {
      setSalvando(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!categoriaId) {
      setErro('Escolha uma categoria.')
      return
    }

    const valorNumerico = Number(valor.replace(',', '.'))
    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      setErro('O valor deve ser maior que zero.')
      return
    }

    setErro('')
    setSalvando(true)

    try {
      await criarMovimentacao({
        contaId,
        categoriaId: Number(categoriaId),
        descricao: descricao.trim(),
        valor: valorNumerico,
      })
      onCriada()
    } catch (err) {
      setErro(mensagemDeErro(err, 'Não foi possível salvar a movimentação.'))
      setSalvando(false)
    }
  }

  return (
    <S.Overlay>
      <S.Modal ref={modalRef} role="dialog" aria-modal="true" aria-label="Nova movimentação">
        <S.Titulo>Nova movimentação</S.Titulo>

        <S.Form onSubmit={handleSubmit} noValidate>
          <S.Field>
            Categoria
            <S.Row>
              <S.Select
                name="categoria"
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
              >
                <option value="">Selecione...</option>
                {/* Agrupado por tipo: é daqui que sai se a movimentação é
                    entrada ou saída, então precisa ficar visível. */}
                {entradas.length > 0 && (
                  <optgroup label="Entradas">
                    {entradas.map((c) => (
                      <option key={c.categoriaId} value={c.categoriaId}>
                        {c.nome}
                      </option>
                    ))}
                  </optgroup>
                )}
                {saidas.length > 0 && (
                  <optgroup label="Saídas">
                    {saidas.map((c) => (
                      <option key={c.categoriaId} value={c.categoriaId}>
                        {c.nome}
                      </option>
                    ))}
                  </optgroup>
                )}
              </S.Select>

              <S.IconButton
                type="button"
                aria-label="Adicionar categoria"
                onClick={() => setCriandoCategoria((atual) => !atual)}
              >
                +
              </S.IconButton>
            </S.Row>
          </S.Field>

          {criandoCategoria && (
            <S.SubForm>
              <S.Input
                placeholder="Nome da categoria"
                value={nomeCategoria}
                onChange={(e) => setNomeCategoria(e.target.value)}
                autoFocus
              />
              <S.Row>
                <S.Select
                  aria-label="Tipo da categoria"
                  value={tipoCategoria}
                  onChange={(e) => setTipoCategoria(e.target.value as TipoMovimentacao)}
                >
                  <option value={TIPO_SAIDA}>Saída</option>
                  <option value={TIPO_ENTRADA}>Entrada</option>
                </S.Select>
                <S.Button type="button" onClick={handleCriarCategoria} disabled={salvando}>
                  Criar
                </S.Button>
              </S.Row>
            </S.SubForm>
          )}

          <S.Field>
            Descrição
            <S.Input
              name="descricao"
              maxLength={255}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </S.Field>

          <S.Field>
            Valor
            <S.Input
              name="valor"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </S.Field>

          {erro && <S.ErrorMessage role="alert">{erro}</S.ErrorMessage>}

          <S.Acoes>
            <S.GhostButton type="button" onClick={onFechar} disabled={salvando}>
              Cancelar
            </S.GhostButton>
            <S.Button type="submit" disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </S.Button>
          </S.Acoes>
        </S.Form>
      </S.Modal>
    </S.Overlay>
  )
}
