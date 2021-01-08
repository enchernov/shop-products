import React, { FunctionComponent } from 'react'

import ShopProvider from '@providers/ShopProvider'
import { initialState, shopReducer } from '@reducers/shopReducer'

const ShopController: FunctionComponent = ({ children }) => {
  return (
    <ShopProvider reducer={shopReducer} initialState={initialState}>
      {children}
    </ShopProvider>
  )
}

export default ShopController
