import styled from 'styled-components'

export const Painel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 900px;
`

/** Entradas / Saídas / Saldo do período. */
export const Resumo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (width <= 600px) {
    grid-template-columns: 1fr;
  }
`

export const Tile = styled.div`
  padding: 16px 18px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
`

export const TileRotulo = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const TileValor = styled.p<{ $tom?: 'entrada' | 'saida' | 'negativo' }>`
  margin-top: 4px;
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme, $tom }) =>
    $tom === 'entrada'
      ? theme.colors.success
      : $tom === 'saida' || $tom === 'negativo'
        ? theme.colors.danger
        : theme.colors.text};
`

export const Cabecalho = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const Periodo = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const Button = styled.button`
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

/** Entradas à esquerda, saídas à direita. */
export const Listas = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (width <= 700px) {
    grid-template-columns: 1fr;
  }
`

export const Lista = styled.div`
  padding: 16px 18px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
`

export const ListaTitulo = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const Itens = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  list-style: none;
`

export const Item = styled.li`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`

export const ItemDescricao = styled.span`
  overflow: hidden;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const ItemMeta = styled.span`
  display: block;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const ItemValor = styled.span<{ $tom: 'entrada' | 'saida' }>`
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme, $tom }) =>
    $tom === 'entrada' ? theme.colors.success : theme.colors.danger};
`

export const Vazio = styled.p`
  margin-top: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const ErrorMessage = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`
