import React, { FunctionComponent } from 'react'

import ThemeProvider from '@providers/ThemeProvider'
import { initialState, themeReducer } from '@reducers/themeReducer'

const ThemeController: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider reducer={themeReducer} initialState={initialState}>
      {children}
    </ThemeProvider>
  )
}

export default ThemeController
