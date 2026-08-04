import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

import {
  atualizarConfiguracao,
  obterConfiguracao,
} from '../../features/settings/settings.service'
import { MOEDAS_PERMITIDAS } from '../../features/settings/settings.types'
import { useDismiss } from '../../hooks/useDismiss'
import { ApiError } from '../../services/api'
import * as S from './SettingsMenu'

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

/**
 * Engrenagem fixa no canto superior direito. Ao clicar, abre um popover
 * ancorado nela com as configurações do usuário (dia de fechamento e moeda).
 */
export function SettingsMenu() {
  const [open, setOpen] = useState(false)
  const [dia, setDia] = useState('')
  const [moeda, setMoeda] = useState<string>(MOEDAS_PERMITIDAS[0])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const anchorRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])
  useDismiss(anchorRef, close, open)

  // Recarrega a cada abertura: o painel sempre mostra o que está no servidor,
  // mesmo que outra aba tenha alterado a configuração no meio do caminho.
  useEffect(() => {
    if (!open) return

    let cancelado = false

    setLoading(true)
    setError('')
    setSuccess('')

    obterConfiguracao()
      .then((configuracao) => {
        if (cancelado) return
        setDia(String(configuracao.diaFechamentoMes))
        setMoeda(configuracao.moeda)
      })
      .catch((err: unknown) => {
        if (cancelado) return
        setError(
          err instanceof ApiError
            ? err.message
            : 'Não foi possível carregar as configurações.',
        )
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })

    return () => {
      cancelado = true
    }
  }, [open])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const diaFechamentoMes = Number(dia)
    if (!Number.isInteger(diaFechamentoMes) || diaFechamentoMes < 1 || diaFechamentoMes > 31) {
      setSuccess('')
      setError('O dia de fechamento do mês deve estar entre 1 e 31.')
      return
    }

    setError('')
    setSuccess('')
    setSaving(true)

    try {
      const atualizada = await atualizarConfiguracao({
        diaFechamentoMes,
        moeda,
      })
      // Reflete o que o servidor devolveu (ex: moeda normalizada em maiúsculo).
      setDia(String(atualizada.diaFechamentoMes))
      setMoeda(atualizada.moeda)
      setSuccess('Configurações salvas.')
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Erro inesperado. Tente novamente.',
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <S.Anchor ref={anchorRef}>
      <S.GearButton
        type="button"
        aria-label="Configurações"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((atual) => !atual)}
      >
        <GearIcon />
      </S.GearButton>

      {open && (
        <S.Popover role="dialog" aria-label="Configurações do usuário">
          <S.Title>Configurações</S.Title>

          {loading ? (
            <S.Form as="div">
              <S.Message>Carregando...</S.Message>
            </S.Form>
          ) : (
            <S.Form onSubmit={handleSubmit} noValidate>
              <S.Field>
                Dia de fechamento do mês
                <S.Input
                  name="diaFechamentoMes"
                  type="number"
                  min={1}
                  max={31}
                  step={1}
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                  required
                />
              </S.Field>

              <S.Field>
                Moeda
                <S.Select
                  name="moeda"
                  value={moeda}
                  onChange={(e) => setMoeda(e.target.value)}
                >
                  {/* Uma moeda vinda do servidor fora da lista ainda aparece,
                      em vez de o <select> cair silenciosamente na primeira. */}
                  {!MOEDAS_PERMITIDAS.includes(moeda as never) && (
                    <option value={moeda}>{moeda}</option>
                  )}
                  {MOEDAS_PERMITIDAS.map((valor) => (
                    <option key={valor} value={valor}>
                      {valor}
                    </option>
                  ))}
                </S.Select>
              </S.Field>

              {error && <S.ErrorMessage role="alert">{error}</S.ErrorMessage>}
              {success && <S.SuccessMessage role="status">{success}</S.SuccessMessage>}

              <S.Button type="submit" disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar'}
              </S.Button>
            </S.Form>
          )}
        </S.Popover>
      )}
    </S.Anchor>
  )
}
