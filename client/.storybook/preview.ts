import { addDecorator } from '@storybook/react'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'

import ThemeProvider from '../store/providers/ThemeProvider'
import LightTheme from '../public/scripts/themes/light-theme'
import DarkTheme from '../public/scripts/themes/dark-theme'

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
  viewport: {
      viewports: MINIMAL_VIEWPORTS,
  }
}
