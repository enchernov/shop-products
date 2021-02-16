import { Reducer } from 'react'
import Cookies from 'js-cookie'

import { IShopProps, SortingType } from '@interfaces/shop'
import { IActionsProps } from '@interfaces/index'
import * as ACTION_TYPES from '../types/shop'
import { sortProducts } from '@utils/shop'

const cart = Cookies.get('cart')
const wishlist = Cookies.get('wishlist')

export const initialState: IShopProps = {
  categories: [],
  products: [],
  sorting: 'products_publishing_date',
  cart: cart?.length ? JSON.parse(cart) : [],
  wishlist: wishlist?.length ? JSON.parse(wishlist) : [],
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
      const products = sortProducts(action.payload, 'newest')
      return {
        ...state,
        products: products,
      }
    }
    case ACTION_TYPES.SET_SORTING: {
      const sortKey: SortingType = action.payload
      const sortedProducts = sortProducts(state.products, sortKey)
      return {
        ...state,
        sorting: sortKey,
        products: sortedProducts,
      }
    }
    case ACTION_TYPES.UPDATE_CART: {
      return {
        ...state,
        cart: action.payload,
      }
    }
    case ACTION_TYPES.UPDATE_WISHLIST: {
      return {
        ...state,
        wishlist: action.payload,
      }
    }
    default:
      return state
  }
}
