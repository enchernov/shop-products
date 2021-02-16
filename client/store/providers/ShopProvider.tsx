import React, {
  createContext,
  FunctionComponent,
  useReducer,
  useMemo,
  useEffect,
} from 'react'

import { IContextProviderProps, IInitContextProps } from '@interfaces/index'
import { IShopProps } from '@interfaces/shop'
import { useQuery } from '@apollo/client'
import CATEGORIES from '@graphql/queries/Categories'
import PRODUCTS from '@graphql/queries/Products'
import { fetchShop } from '@utils/shop'

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
  const categoriesQuery = useQuery(CATEGORIES)
  const productsQuery = useQuery(PRODUCTS)

  useEffect(() => {
    fetchShop(dispatch, state, categoriesQuery, productsQuery)
  }, [categoriesQuery.data, productsQuery.data])
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export default ShopProvider
