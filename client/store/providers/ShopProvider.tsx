import React, {
  createContext,
  FunctionComponent,
  useReducer,
  useMemo,
} from 'react'

import { IContextProviderProps, IInitContextProps } from '@interfaces/index'
import { IShopProps } from '@interfaces/shop'

export const ShopContext = createContext({} as IInitContextProps<IShopProps>)

const ShopProvider: FunctionComponent<IContextProviderProps<IShopProps>> = ({
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

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export default ShopProvider
