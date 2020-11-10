import * as React from 'react'
import { FunctionComponent, ReactNode } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'

import { ThemeProvider as StyledThemeProvider } from 'styled-components'

interface IThemeProvider {
  theme: any
  children: ReactNode
}

const ThemeProvider: FunctionComponent<IThemeProvider> = ({
  theme,
  children,
}) => {
  const nextTheme = Object.assign({}, theme)

  return (
    <StylesProvider injectFirst>
      <StyledThemeProvider theme={nextTheme}>
        <MuiThemeProvider theme={nextTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </StyledThemeProvider>
    </StylesProvider>
  )
}

export default ThemeProvider
