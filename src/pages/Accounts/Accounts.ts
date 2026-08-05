import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: 100%;
  /* Topo generoso: as barras fixas ocupam os dois cantos superiores. */
  padding: 96px 24px 24px;
`

/**
 * Barra fixa do canto superior esquerdo, igual à da Home. Em coluna para a
 * mensagem de erro cair logo abaixo dos controles, e não longe deles.
 */
export const TopBar = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* Não avançar sobre a barra de Sair/configurações do outro canto. */
  max-width: min(72vw, 620px);
`

export const TopBarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const controleBase = `
  height: 42px;
  border-radius: 9px;
  cursor: pointer;
`

export const BackButton = styled.button`
  ${controleBase}
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 42px;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  border: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

export const SelectorAnchor = styled.div`
  position: relative;
  width: min(44vw, 220px);
`

export const SelectorButton = styled.button`
  ${controleBase}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 0 14px;
  font-weight: 600;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};

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
  overflow: hidden auto;
  max-height: 260px;
  list-style: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9px;
  box-shadow: 0 12px 30px rgb(31 29 25 / 18%);
  animation: ${fadeIn} 0.15s ease-out;
`

export const Option = styled.li`
  overflow: hidden;
  padding: 11px 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
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

export const Button = styled.button`
  ${controleBase}
  flex-shrink: 0;
  padding: 0 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  border: none;

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
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.field};
  }
`

export const Input = styled.input`
  ${controleBase}
  width: min(44vw, 220px);
  padding: 0 14px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.field};
  border: 1px solid transparent;
  cursor: text;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

/** Formulário dentro da barra fixa: largura pelo conteúdo, não 100%. */
export const BarForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const Painel = styled.div`
  width: 100%;
  max-width: 460px;
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

/** Formulário de criação no corpo da tela (estado vazio). */
export const Form = styled.form`
  display: flex;
  gap: 10px;
  width: 100%;
`

export const FormInput = styled(Input)`
  width: auto;
  flex: 1;
`

export const Message = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const ErrorMessage = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`
