import styled, { keyframes } from 'styled-components'

/** Âncora fixa no canto superior direito: o popover se posiciona por ela. */
export const Anchor = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;
`

export const GearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.15s, transform 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  /* A engrenagem gira ao abrir, deixando claro que o painel é dela. */
  &[aria-expanded='true'] {
    transform: rotate(90deg);
  }

  svg {
    width: 22px;
    height: 22px;
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

export const Popover = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 260px;
  padding: 18px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1.5rem;
  box-shadow: 0 12px 30px rgb(31 29 25 / 18%);
  animation: ${fadeIn} 0.15s ease-out;
`

export const Title = styled.h2`
  font-size: 15px;
  font-weight: 600;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const Input = styled.input`
  padding: 10px 12px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.field};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const Select = styled.select`
  padding: 10px 12px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.field};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  /* O menu nativo do <select> não herda o fundo do popover. */
  option {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
  }
`

export const Button = styled.button`
  margin-top: 4px;
  padding: 11px 12px;
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

export const Message = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const ErrorMessage = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`

export const SuccessMessage = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.success};
`
