import { Dispatch, ReactNode, Reducer } from 'react'

// Redux interfaces

export interface IActionsProps {
  type: string
  payload?: any
}

export interface IContextProviderProps<T> {
  children: ReactNode
  reducer: Reducer<T, IActionsProps>
  initialState: T
}

export interface IInitContextProps<T> {
  state: T
  dispatch: Dispatch<IActionsProps>
}
