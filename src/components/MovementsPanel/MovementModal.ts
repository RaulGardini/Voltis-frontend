import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgb(31 29 25 / 45%);
`

export const Modal = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1.5rem;
  box-shadow: 0 20px 50px rgb(31 29 25 / 25%);
`

export const Titulo = styled.h2`
  font-size: 17px;
  font-weight: 600;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 18px;
`

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`

/** Linha do seletor de categoria + botão de adicionar categoria. */
export const Row = styled.div`
  display: flex;
  gap: 8px;
`

const campoBase = `
  height: 42px;
  padding: 0 12px;
  border-radius: 9px;
  outline: none;
`

export const Input = styled.input`
  ${campoBase}
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.field};
  border: 1px solid transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const Select = styled.select`
  ${campoBase}
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.field};
  border: 1px solid transparent;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  option {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
  }
`

export const Button = styled.button`
  ${campoBase}
  flex-shrink: 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
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

/** Botão quadrado do "+" ao lado da categoria. */
export const IconButton = styled(Button)`
  width: 42px;
  padding: 0;
  font-size: 20px;
  line-height: 1;
`

/** Mini formulário de nova categoria, aberto dentro do próprio modal. */
export const SubForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.field};
  border-radius: 9px;
`

export const Acoes = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 4px;
`

export const ErrorMessage = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`
