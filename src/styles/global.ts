import { createGlobalStyle } from 'styled-components'

import background from '../assets/background.jpg'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
  }

  /* Imagem de fundo global: fica atrás de tudo, em todas as telas. */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    background-image: url(${background});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  /* Véu escuro por cima da imagem, pra manter o texto legível.
     Ajuste a opacidade ou remova se não precisar. */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input {
    font: inherit;
  }
`
