import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100%;
`

/**
 * Barra fixa do canto superior esquerdo, espelhando a da direita: o botão e a
 * saudação num flex com gap, em vez de posicionados um a um. Assim mudar o
 * texto do botão não desloca a saudação para cima do que vier depois.
 */
export const TopBar = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 16px;
`

export const AccountButton = styled.button`
  flex-shrink: 0;
  height: 42px;
  padding: 0 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 9px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`
