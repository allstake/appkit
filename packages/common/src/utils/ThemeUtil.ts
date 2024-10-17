// -- Types ------------------------------------------------------------------
export type ThemeType = 'dark' | 'light'

export interface ThemeVariables {
  '--w3mx-font-family'?: string
  '--w3mx-accent'?: string
  '--w3mx-color-mix'?: string
  '--w3mx-color-mix-strength'?: number
  '--w3mx-font-size-master'?: string
  '--w3mx-border-radius-master'?: string
  '--w3mx-z-index'?: number
}

export interface W3mThemeVariables {
  '--w3mx-accent': string
  '--w3mx-background': string
}

// -- Utilities ---------------------------------------------------------------
export function getW3mThemeVariables(themeVariables?: ThemeVariables, themeType?: ThemeType) {
  if (themeType === 'light') {
    return {
      '--w3mx-accent': themeVariables?.['--w3mx-accent'] || 'hsla(231, 100%, 70%, 1)',
      '--w3mx-background': '#fff'
    }
  }

  return {
    '--w3mx-accent': themeVariables?.['--w3mx-accent'] || 'hsla(230, 100%, 67%, 1)',
    '--w3mx-background': '#121313'
  }
}
