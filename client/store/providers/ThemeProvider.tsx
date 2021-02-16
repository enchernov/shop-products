import * as React from 'react'
import { createContext, FunctionComponent, useMemo, useReducer } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'

import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { IInitContextProps, IContextProviderProps } from '@interfaces/index'
import { IThemeProps } from '@interfaces/theme'

export const ThemeContext = createContext({} as IInitContextProps<IThemeProps>)

const ThemeProvider: FunctionComponent<IContextProviderProps<IThemeProps>> = ({
  children,
  reducer,
  initialState,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )
  const nextTheme = Object.assign({}, value.state.theme)
  return (
    <ThemeContext.Provider value={value}>
      <StylesProvider injectFirst>
        <StyledThemeProvider theme={nextTheme}>
          <MuiThemeProvider theme={nextTheme}>
            <CssBaseline />
            {children}
          </MuiThemeProvider>
        </StyledThemeProvider>
      </StylesProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
