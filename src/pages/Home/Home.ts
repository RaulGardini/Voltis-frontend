import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 24px;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 400px;
  padding: 32px 15px;
  text-align: center;
  background: #708a8d6e;
  border-radius: 1.5rem;
`

export const Greeting = styled.h1`
  font-size: 20px;
  font-weight: 600;
`

export const Email = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const Button = styled.button`
  padding: 11px 12px;
  font-weight: 600;
  color: #fff;
  background: #a8a8a8a8;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;

  &:hover {
    background: #9e9e9e;
  }
`
