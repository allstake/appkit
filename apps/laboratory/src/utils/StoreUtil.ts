import { proxy } from 'valtio/vanilla'

interface ThemeVariables {
  '--w3mx-font-family'?: string
  '--w3mx-accent'?: string
  '--w3mx-color-mix'?: string
  '--w3mx-color-mix-strength'?: number
  '--w3mx-font-size-master'?: string
  '--w3mx-border-radius-master'?: string
  '--w3mx-z-index'?: number
}
interface ThemeStoreState {
  mixColorStrength: number
  mixColor?: string
  accentColor?: string
  borderRadius: string
  themeVariables: ThemeVariables
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modal?: any
}

const state = proxy<ThemeStoreState>({
  mixColorStrength: 0,
  mixColor: undefined,
  accentColor: undefined,
  borderRadius: '4px',
  themeVariables: {},
  modal: undefined
})

export const ThemeStore = {
  state,

  setMixColorStrength(value: ThemeStoreState['mixColorStrength']) {
    state.mixColorStrength = value
    if (state.modal) {
      state.modal.setThemeVariables({ '--w3mx-color-mix-strength': value })
    }
  },

  setMixColor(value: ThemeStoreState['mixColor']) {
    state.mixColor = value
    if (state.modal) {
      state.modal.setThemeVariables({ '--w3mx-color-mix': value })
    }
  },

  setAccentColor(value: ThemeStoreState['accentColor']) {
    state.accentColor = value
    if (state.modal) {
      state.modal.setThemeVariables({ '--w3mx-accent': value })
    }
  },

  setBorderRadius(value: ThemeStoreState['borderRadius']) {
    state.borderRadius = value
    if (state.modal) {
      state.modal.setThemeVariables({ '--w3mx-border-radius-master': value })
    }
  },

  setThemeVariables(value: ThemeStoreState['themeVariables']) {
    state.themeVariables = value
    if (state.modal) {
      state.modal.setThemeVariables(value)
    }
  },

  setModal(value: ThemeStoreState['modal']) {
    state.modal = value
  }
}
