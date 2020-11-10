import React, { FunctionComponent, Reducer } from 'react'
import AppProvider, { IActionsProps, IAppProps } from '../providers/AppProvider'

const AppController: FunctionComponent = ({ children }) => {
  const initialState: IAppProps = {
    isAuthenticated: false,
    user: null,
    loading: true,
  }

  const reducer: Reducer<IAppProps, IActionsProps> = (state, action) => {
    switch (action.type) {
      case 'setAuth': {
        return {
          ...state,
          isAuthenticated: action.value,
        }
      }
      case 'setUser': {
        return {
          ...state,
          user: action.value,
        }
      }
      case 'getUser': {
        return state.user
      }
      default:
        return state
    }
  }

  return (
    <AppProvider reducer={reducer} initialState={initialState}>
      {children}
    </AppProvider>
  )
}

export default AppController
