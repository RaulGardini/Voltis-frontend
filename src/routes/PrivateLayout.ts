import styled from 'styled-components'

/**
 * Barra fixa do canto superior direito. Os botões ficam num flex com gap em
 * vez de posicionados individualmente: assim mudar o tamanho de um não
 * desalinha o outro.
 */
export const TopBar = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const LogoutButton = styled.button`
  height: 42px;
  padding: 0 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.field};
  }
`
