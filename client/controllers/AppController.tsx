import React, { FunctionComponent, Reducer } from 'react'
import AppProvider, { IActionsProps, IAppProps } from '../providers/AppProvider'

import * as ACTION_TYPES from '../actions/types'

const AppController: FunctionComponent = ({ children }) => {
  const initialState: IAppProps = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    errorMessage: null,
  }

  const reducer: Reducer<IAppProps, IActionsProps> = (state, action) => {
    switch (action.type) {
      case ACTION_TYPES.REQUEST_AUTH: {
        return {
          ...state,
          loading: true,
        }
      }
      case ACTION_TYPES.AUTH_SUCCESS: {
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload.user,
          token: action.payload.token,
        }
      }
      case ACTION_TYPES.AUTH_ERROR: {
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          errorMessage: action.error,
        }
      }
      case ACTION_TYPES.LOGOUT: {
        return {
          ...state,
          user: null,
          token: null,
        }
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
