export const theme = {
  colors: {
    /** Off-white que domina a interface. */
    background: '#ede5d1',
    /** Cards e painéis: um tom acima do fundo, pra destacar sem virar branco. */
    surface: '#f6f1e4',
    /** Campos de formulário: um tom abaixo, pra parecerem "afundados". */
    field: '#e4dac2',
    border: '#d5c9ad',
    /** Preto suave, nunca #000: puro contrasta demais sobre creme e cansa a vista. */
    text: '#1f1d19',
    textMuted: '#6c6455',
    /** Cor dos botões e ações. */
    primary: '#26241f',
    primaryHover: '#3c3831',
    /** Texto/ícone sobre a cor primária. */
    onPrimary: '#f4efe3',
    danger: '#a52c22',
    success: '#2f6b45',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
  },
} as const

export type Theme = typeof theme
