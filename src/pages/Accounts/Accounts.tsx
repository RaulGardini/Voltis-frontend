import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import {
  atualizarConta,
  criarConta,
  listarContas,
} from '../../features/accounts/accounts.service'
import type { Conta } from '../../features/accounts/accounts.types'
import { CONTA_NOME_TAMANHO_MAXIMO } from '../../features/accounts/accounts.types'
import { MovementsPanel } from '../../components/MovementsPanel/MovementsPanel.tsx'
import { useDismiss } from '../../hooks/useDismiss'
import { ApiError } from '../../services/api'
import * as S from './Accounts'

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  )
}

/** Barra fixa do canto superior esquerdo, presente em todos os estados da tela. */
function TopBar({ children, erro }: { children?: ReactNode; erro?: string }) {
  const navigate = useNavigate()

  return (
    <S.TopBar>
      <S.TopBarRow>
        <S.BackButton
          type="button"
          aria-label="Voltar para a home"
          onClick={() => navigate('/')}
        >
          <ArrowLeftIcon />
        </S.BackButton>

        {children}
      </S.TopBarRow>

      {erro && <S.ErrorMessage role="alert">{erro}</S.ErrorMessage>}
    </S.TopBar>
  )
}

function mensagemDeErro(err: unknown, fallback: string): string {
  return err instanceof ApiError ? err.message : fallback
}

export default function Accounts() {
  const { contaId } = useParams()
  const navigate = useNavigate()

  // null = ainda carregando. Distingue "sem contas" de "não sei ainda", que
  // decidem telas diferentes.
  const [contas, setContas] = useState<Conta[] | null>(null)
  const [erroCarregamento, setErroCarregamento] = useState('')

  const [seletorAberto, setSeletorAberto] = useState(false)
  const [criando, setCriando] = useState(false)
  const [editando, setEditando] = useState(false)
  const [nome, setNome] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [erroFormulario, setErroFormulario] = useState('')

  const seletorRef = useRef<HTMLDivElement>(null)
  const fecharSeletor = useCallback(() => setSeletorAberto(false), [])
  useDismiss(seletorRef, fecharSeletor, seletorAberto)

  useEffect(() => {
    let cancelado = false

    listarContas()
      .then((lista) => {
        if (!cancelado) setContas(lista)
      })
      .catch((err: unknown) => {
        if (!cancelado) {
          setErroCarregamento(
            mensagemDeErro(err, 'Não foi possível carregar suas contas.'),
          )
        }
      })

    return () => {
      cancelado = true
    }
  }, [])

  const contaAtual =
    contas?.find((conta) => String(conta.contaId) === contaId) ?? null

  function abrirCriacao() {
    setSeletorAberto(false)
    setEditando(false)
    setErroFormulario('')
    setNome('')
    setCriando(true)
  }

  function abrirEdicao() {
    if (!contaAtual) return
    setSeletorAberto(false)
    setCriando(false)
    setErroFormulario('')
    setNome(contaAtual.nome)
    setEditando(true)
  }

  function cancelarFormulario() {
    setCriando(false)
    setEditando(false)
    setErroFormulario('')
  }

  async function handleCriar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nomeNormalizado = nome.trim()
    if (!nomeNormalizado) {
      setErroFormulario('O nome da conta é obrigatório.')
      return
    }

    setErroFormulario('')
    setSalvando(true)

    try {
      const nova = await criarConta({ nome: nomeNormalizado })
      setContas([...(contas ?? []), nova])
      setCriando(false)
      setNome('')
      // Abre a conta recém-criada: sem isso o usuário criaria a conta e
      // continuaria olhando para a tela vazia.
      navigate(`/contas/${nova.contaId}`, { replace: true })
    } catch (err) {
      setErroFormulario(mensagemDeErro(err, 'Não foi possível criar a conta.'))
    } finally {
      setSalvando(false)
    }
  }

  async function handleRenomear(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!contaAtual) return

    const nomeNormalizado = nome.trim()
    if (!nomeNormalizado) {
      setErroFormulario('O nome da conta é obrigatório.')
      return
    }

    setErroFormulario('')
    setSalvando(true)

    try {
      const atualizada = await atualizarConta(contaAtual.contaId, {
        nome: nomeNormalizado,
      })
      setContas(
        (contas ?? []).map((conta) =>
          conta.contaId === atualizada.contaId ? atualizada : conta,
        ),
      )
      setEditando(false)
    } catch (err) {
      setErroFormulario(mensagemDeErro(err, 'Não foi possível salvar o nome.'))
    } finally {
      setSalvando(false)
    }
  }

  if (erroCarregamento) {
    return (
      <>
        <TopBar />
        <S.Container>
          <S.Painel>
            <S.Card>
              <S.CardTitulo>Contas bancárias</S.CardTitulo>
              <S.CardDetalhe>{erroCarregamento}</S.CardDetalhe>
            </S.Card>
          </S.Painel>
        </S.Container>
      </>
    )
  }

  if (contas === null) {
    return (
      <>
        <TopBar />
        <S.Container>
          <S.Painel>
            <S.Message>Carregando...</S.Message>
          </S.Painel>
        </S.Container>
      </>
    )
  }

  // Nenhuma conta ainda: só o caminho de criação faz sentido aqui.
  if (contas.length === 0) {
    return (
      <>
        <TopBar />
        <S.Container>
          <S.Painel>
            <S.EmptyState>
              <div>
                <S.CardTitulo>Nenhuma conta bancária</S.CardTitulo>
                <S.CardDetalhe>
                  Crie sua primeira conta para começar a organizar suas
                  movimentações.
                </S.CardDetalhe>
              </div>

              {criando ? (
                <S.Form onSubmit={handleCriar} noValidate>
                  <S.FormInput
                    name="nome"
                    placeholder="Ex.: Nubank"
                    maxLength={CONTA_NOME_TAMANHO_MAXIMO}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    autoFocus
                    required
                  />
                  <S.Button type="submit" disabled={salvando}>
                    {salvando ? 'Criando...' : 'Criar'}
                  </S.Button>
                </S.Form>
              ) : (
                <S.Button type="button" onClick={abrirCriacao}>
                  Criar conta
                </S.Button>
              )}

              {erroFormulario && (
                <S.ErrorMessage role="alert">{erroFormulario}</S.ErrorMessage>
              )}
            </S.EmptyState>
          </S.Painel>
        </S.Container>
      </>
    )
  }

  // Tem conta mas a URL não aponta para nenhuma: abre a mais antiga, que a API
  // já devolve na primeira posição.
  if (!contaId) {
    return <Navigate to={`/contas/${contas[0].contaId}`} replace />
  }

  // URL com id que não é do usuário (ou não existe mais).
  if (!contaAtual) {
    return (
      <>
        <TopBar />
        <S.Container>
          <S.Painel>
            <S.Card>
              <S.CardTitulo>Conta não encontrada</S.CardTitulo>
              <S.CardDetalhe>
                Essa conta não existe ou não pertence a você.
              </S.CardDetalhe>
              <S.CardDetalhe>
                <S.GhostButton
                  type="button"
                  onClick={() =>
                    navigate(`/contas/${contas[0].contaId}`, { replace: true })
                  }
                >
                  Abrir minha primeira conta
                </S.GhostButton>
              </S.CardDetalhe>
            </S.Card>
          </S.Painel>
        </S.Container>
      </>
    )
  }

  return (
    <>
      <TopBar erro={erroFormulario}>
        {criando || editando ? (
          <S.BarForm
            onSubmit={criando ? handleCriar : handleRenomear}
            noValidate
          >
            <S.Input
              name="nome"
              placeholder="Ex.: Nubank"
              maxLength={CONTA_NOME_TAMANHO_MAXIMO}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoFocus
              required
            />
            <S.Button type="submit" disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </S.Button>
            <S.GhostButton
              type="button"
              onClick={cancelarFormulario}
              disabled={salvando}
            >
              Cancelar
            </S.GhostButton>
          </S.BarForm>
        ) : (
          <>
            <S.SelectorAnchor ref={seletorRef}>
              <S.SelectorButton
                type="button"
                aria-haspopup="listbox"
                aria-expanded={seletorAberto}
                onClick={() => setSeletorAberto((aberto) => !aberto)}
              >
                <span>{contaAtual.nome}</span>
                <ChevronIcon />
              </S.SelectorButton>

              {seletorAberto && (
                <S.Dropdown role="listbox" aria-label="Selecionar conta">
                  {contas.map((conta) => (
                    <S.Option
                      key={conta.contaId}
                      role="option"
                      aria-selected={conta.contaId === contaAtual.contaId}
                      onClick={() => {
                        setSeletorAberto(false)
                        navigate(`/contas/${conta.contaId}`)
                      }}
                    >
                      {conta.nome}
                    </S.Option>
                  ))}

                  <S.NovaContaOption onClick={abrirCriacao}>
                    + Nova conta
                  </S.NovaContaOption>
                </S.Dropdown>
              )}
            </S.SelectorAnchor>

            <S.Button type="button" onClick={abrirEdicao}>
              Editar
            </S.Button>
          </>
        )}
      </TopBar>

      <S.Container>
        {/* key: trocar de conta remonta o painel, zerando o resumo da anterior
            em vez de mostrar os números antigos enquanto carrega. */}
        <MovementsPanel key={contaAtual.contaId} contaId={contaAtual.contaId} />
      </S.Container>
    </>
  )
}
