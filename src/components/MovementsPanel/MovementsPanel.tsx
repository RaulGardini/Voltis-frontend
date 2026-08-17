import { useCallback, useEffect, useState } from 'react'

import { obterResumo } from '../../features/movements/movements.service'
import type {
  Movimentacao,
  ResumoMovimentacoes,
} from '../../features/movements/movements.types'
import { obterConfiguracao } from '../../features/settings/settings.service'
import { ApiError } from '../../services/api'
import { MovementModal } from './MovementModal.tsx'
import * as S from './MovementsPanel'

function formatarData(iso: string): string {
  const data = new Date(iso)
  return Number.isNaN(data.getTime())
    ? '—'
    : data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

function Lista({
  titulo,
  itens,
  tom,
  formatar,
}: {
  titulo: string
  itens: Movimentacao[]
  tom: 'entrada' | 'saida'
  formatar: (valor: number) => string
}) {
  return (
    <S.Lista>
      <S.ListaTitulo>{titulo}</S.ListaTitulo>

      {itens.length === 0 ? (
        <S.Vazio>Nada por aqui neste período.</S.Vazio>
      ) : (
        <S.Itens>
          {itens.map((item) => (
            <S.Item key={item.movimentacaoId}>
              <S.ItemDescricao>
                {item.descricao}
                <S.ItemMeta>
                  {formatarData(item.data)}
                  {item.categoria && ` · ${item.categoria}`}
                </S.ItemMeta>
              </S.ItemDescricao>

              <S.ItemValor $tom={tom}>
                {tom === 'saida' && '- '}
                {formatar(item.valor)}
              </S.ItemValor>
            </S.Item>
          ))}
        </S.Itens>
      )}
    </S.Lista>
  )
}

export function MovementsPanel({ contaId }: { contaId: number }) {
  const [resumo, setResumo] = useState<ResumoMovimentacoes | null>(null)
  const [moeda, setMoeda] = useState('BRL')
  const [erro, setErro] = useState('')
  const [modalAberto, setModalAberto] = useState(false)

  const carregar = useCallback(async () => {
    try {
      setResumo(await obterResumo(contaId))
      setErro('')
    } catch (err) {
      setErro(
        err instanceof ApiError
          ? err.message
          : 'Não foi possível carregar as movimentações.',
      )
    }
  }, [contaId])

  useEffect(() => {
    void carregar()
  }, [carregar])

  // A moeda vem das configurações do usuário: exibir R$ fixo estaria errado
  // para quem escolheu USD ou EUR.
  useEffect(() => {
    let cancelado = false

    obterConfiguracao()
      .then((config) => {
        if (!cancelado) setMoeda(config.moeda)
      })
      .catch(() => {
        // Sem configuração, o padrão do sistema (BRL) já serve.
      })

    return () => {
      cancelado = true
    }
  }, [])

  const formatar = useCallback(
    (valor: number) =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: moeda,
      }).format(valor),
    [moeda],
  )

  if (erro) {
    return (
      <S.Painel>
        <S.ErrorMessage role="alert">{erro}</S.ErrorMessage>
      </S.Painel>
    )
  }

  if (!resumo) {
    return (
      <S.Painel>
        <S.Periodo>Carregando movimentações...</S.Periodo>
      </S.Painel>
    )
  }

  return (
    <S.Painel>
      <S.Resumo>
        <S.Tile>
          <S.TileRotulo>Entradas</S.TileRotulo>
          <S.TileValor $tom="entrada">{formatar(resumo.totalEntradas)}</S.TileValor>
        </S.Tile>
        <S.Tile>
          <S.TileRotulo>Saídas</S.TileRotulo>
          <S.TileValor $tom="saida">{formatar(resumo.totalSaidas)}</S.TileValor>
        </S.Tile>
        <S.Tile>
          <S.TileRotulo>Saldo</S.TileRotulo>
          <S.TileValor $tom={resumo.saldo < 0 ? 'negativo' : undefined}>
            {formatar(resumo.saldo)}
          </S.TileValor>
        </S.Tile>
      </S.Resumo>

      <S.Cabecalho>
        <S.Periodo>
          Período de {formatarData(resumo.periodoInicio)} a{' '}
          {formatarData(resumo.periodoFim)}
        </S.Periodo>

        <S.Button type="button" onClick={() => setModalAberto(true)}>
          Adicionar
        </S.Button>
      </S.Cabecalho>

      <S.Listas>
        <Lista
          titulo="Entradas"
          itens={resumo.entradas}
          tom="entrada"
          formatar={formatar}
        />
        <Lista
          titulo="Saídas"
          itens={resumo.saidas}
          tom="saida"
          formatar={formatar}
        />
      </S.Listas>

      {modalAberto && (
        <MovementModal
          contaId={contaId}
          onFechar={() => setModalAberto(false)}
          onCriada={() => {
            setModalAberto(false)
            void carregar()
          }}
        />
      )}
    </S.Painel>
  )
}
