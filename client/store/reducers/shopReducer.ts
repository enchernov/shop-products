import { Reducer } from 'react'
import Cookies from 'js-cookie'

import { IShopProps } from '@interfaces/shop'
import { IActionsProps } from '@interfaces/index'
import * as ACTION_TYPES from '../types/shop'

const cart = Cookies.get('cart')
export const initialState: IShopProps = {
  categories: [],
  products: [],
  sorting: 'newest',
  cart: cart?.length ? JSON.parse(cart) : [],
}

export const shopReducer: Reducer<IShopProps, IActionsProps> = (
  state,
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      }
    }
    case ACTION_TYPES.SET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      }
    }
    case ACTION_TYPES.SET_SORTING: {
      return {
        ...state,
        sorting: action.payload,
      }
    }
    case ACTION_TYPES.UPDATE_CART: {
      return {
        ...state,
        cart: action.payload,
      }
    }
    default:
      return state
  }
}
