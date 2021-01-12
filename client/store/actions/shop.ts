import * as ACTION_TYPES from '../types/shop'

export const setCategories = (value: any) => {
  return {
    type: ACTION_TYPES.SET_CATEGORIES,
    payload: value,
  }
}

export const setProducts = (value: any) => {
  return {
    type: ACTION_TYPES.SET_PRODUCTS,
    payload: value,
  }
}

export const setSorting = (value: any) => {
  return {
    type: ACTION_TYPES.SET_SORTING,
    payload: value,
  }
}

export const updateCart = (value: any) => {
  return {
    type: ACTION_TYPES.UPDATE_CART,
    payload: value,
  }
}

export const updateWishlist = (value: any) => {
  return {
    type: ACTION_TYPES.UPDATE_WISHLIST,
    payload: value,
  }
}
