import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Fecha um elemento flutuante (popover, dropdown) ao clicar fora dele ou
 * apertar Esc — o comportamento que todo usuário espera e ninguém pede.
 *
 * Os listeners só existem enquanto `ativo` é true: um menu fechado não tem
 * motivo para escutar todo clique da página.
 */
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  onDismiss: () => void,
  ativo: boolean,
): void {
  useEffect(() => {
    if (!ativo) return

    function handlePointerDown(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) onDismiss()
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onDismiss()
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [ref, onDismiss, ativo])
}
