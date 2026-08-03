import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 24px;
`

export const Card = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 15px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1.5rem;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin-top: 24px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Input = styled.input`
  padding: 15px 12px;
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
  margin-top: 8px;
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

export const ErrorMessage = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`

export const Footer = styled.p`
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};

  a {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    text-decoration: underline;
  }
`
