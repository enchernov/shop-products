import { addDecorator } from '@storybook/react'
import ThemeProvider from './theme-provider'

import LightTheme from '../src/scripts/themes/light-theme'
import DarkTheme from '../src/scripts/themes/dark-theme'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'

export const themes = [LightTheme, DarkTheme]

addDecorator(withThemesProvider(themes, ThemeProvider))

export const parameters = {
  options: {
    storySort: (a, b) => {
      if (b[1].kind === 'Welcome') {
        return 1
      }
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true })
    },
  },
}
