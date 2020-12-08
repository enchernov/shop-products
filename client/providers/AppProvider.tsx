import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  ReactNode,
  Reducer,
  useReducer,
} from 'react'

export interface IActionsProps {
  type: string
  payload?: any
  error?: any
}

export interface IAppProps {
  isAuthenticated: boolean
  user: any
  loading: boolean
  token: string | null
  errorMessage: string | null
}

interface IAppContextProviderProps {
  children: ReactNode
  reducer: Reducer<IAppProps, IActionsProps>
  initialState: IAppProps
}

interface IInitContextProps {
  state: IAppProps
  dispatch: Dispatch<IActionsProps>
}

export const AppContext = createContext({} as IInitContextProps)

const AppProvider: FunctionComponent<IAppContextProviderProps> = ({
  reducer,
  initialState,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
