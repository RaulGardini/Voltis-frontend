import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: 100%;
  /* Topo generoso: a engrenagem é fixa no canto e não pode encavalar. */
  padding: 84px 24px 24px;
`

export const Painel = styled.div`
  width: 100%;
  max-width: 460px;
`

/** Linha do seletor de conta + botão editar. */
export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const SelectorAnchor = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
`

export const SelectorButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 12px 14px;
  font-weight: 600;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    transition: transform 0.2s;
  }

  &[aria-expanded='true'] svg {
    transform: rotate(180deg);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  left: 0;
  z-index: 5;
  overflow: hidden auto;
  max-height: 260px;
  list-style: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 12px 30px rgb(31 29 25 / 18%);
  animation: ${fadeIn} 0.15s ease-out;
`

export const Option = styled.li`
  padding: 11px 14px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.field};
  }

  &[aria-selected='true'] {
    font-weight: 600;
    background: ${({ theme }) => theme.colors.field};
  }
`

export const NovaContaOption = styled.li`
  padding: 11px 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.field};
  }
`

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.field};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const Button = styled.button`
  flex-shrink: 0;
  padding: 12px 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const GhostButton = styled(Button)`
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.field};
  }
`

export const Card = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1.5rem;
`

export const CardTitulo = styled.h1`
  font-size: 20px;
  font-weight: 600;
`

export const CardDetalhe = styled.p`
  margin-top: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`

/** Estado vazio: usuário ainda não tem nenhuma conta. */
export const EmptyState = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
`

export const Form = styled.form`
  display: flex;
  gap: 10px;
  width: 100%;
`

export const Message = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const ErrorMessage = styled.p`
  margin-top: 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`
