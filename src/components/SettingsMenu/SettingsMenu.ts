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
  color: #fff;
  background: #708a8d6e;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.15s, transform 0.2s;

  &:hover {
    background: #708a8d9e;
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
  background: #708a8de6;
  border-radius: 1.5rem;
  box-shadow: 0 12px 30px rgb(0 0 0 / 35%);
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
  color: ${({ theme }) => theme.colors.text};
`

export const Input = styled.input`
  padding: 10px 12px;
  color: ${({ theme }) => theme.colors.text};
  background: #a8a8a8a8;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  outline: none;
`

export const Select = styled.select`
  padding: 10px 12px;
  color: ${({ theme }) => theme.colors.text};
  background: #a8a8a8a8;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  outline: none;

  /* O menu nativo do <select> herda o fundo da página, não o do popover. */
  option {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
  }
`

export const Button = styled.button`
  margin-top: 4px;
  padding: 11px 12px;
  font-weight: 600;
  color: #fff;
  background: #a8a8a8a8;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #9e9e9e;
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
  color: #7ee2a8;
`
