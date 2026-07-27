export const theme = {
  colors: {
    background: '#0f1115',
    surface: '#171a21',
    border: '#2a303c',
    text: '#e6e8ee',
    textMuted: '#98a1b3',
    primary: '#4f7cff',
    primaryHover: '#3d68e6',
    danger: '#ff5d5d',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
  },
} as const

export type Theme = typeof theme
