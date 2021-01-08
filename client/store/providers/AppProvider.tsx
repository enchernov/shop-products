import React, {
  createContext,
  FunctionComponent,
  useReducer,
  useMemo,
} from 'react'

import { IContextProviderProps, IInitContextProps } from '@interfaces/index'
import { IAppProps } from '@interfaces/auth'

export const AppContext = createContext({} as IInitContextProps<IAppProps>)

const AppProvider: FunctionComponent<IContextProviderProps<IAppProps>> = ({
  reducer,
  initialState,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
