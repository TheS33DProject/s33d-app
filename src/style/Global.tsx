import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Fredoka', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }

    .cwzysi {
        background-color: #41a65b !important;
    }
    
    .kCKXqq {
      background: #f0f0f0 !important;
    }

    .jKVFtq {
        background-color: rgba(0, 44, 0, 0.25) !important;
    }
  }
`

export default GlobalStyle
