import Cookies from 'js-cookie'

import { updateCart, updateWishlist } from '@actions/shop'
import { ICartItem, IProductProps, SortingType } from '@interfaces/shop'

import * as ACTIONS from '@actions/shop'
import { logoutUser } from '@utils/auth'

// === SHOP

export const buy = async (dispatch, id, cart, available, enqueueSnackbar) => {
  try {
    if ((await countOfItem(id, cart)) < available) {
      const data = await addToCart(dispatch, id, cart)
      if (data) enqueueSnackbar('Товар в корзине', { variant: 'success' })
      else enqueueSnackbar('Возникла ошибка', { variant: 'error' })
    } else {
      enqueueSnackbar('Макс. кол-во товара в корзине', { variant: 'warning' })
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchShop = async (
  dispatch,
  state,
  categoriesQuery,
  productsQuery
) => {
  try {
    const {
      data: categoriesData,
      error: categoriesError,
      loading: categoriesLoading,
    } = categoriesQuery
    const {
      data: productsData,
      error: productsError,
      loading: productsLoading,
    } = productsQuery

    if (productsError || categoriesError) {
      await logoutUser(dispatch)
    }

    if (
      !categoriesLoading &&
      !categoriesError &&
      categoriesData?.categories &&
      state?.categories !== categoriesData.categories
    ) {
      await dispatch(ACTIONS.setCategories(categoriesData.categories))
    }
    if (
      !productsLoading &&
      !productsError &&
      productsData?.products &&
      state?.products !== productsData.products
    ) {
      await dispatch(ACTIONS.setProducts(productsData.products))
    }
  } catch (e) {
    await logoutUser(dispatch)
    console.log(e)
  }
}

// === CART

export const countOfItem = (id, cart) => {
  return cart.find((x) => x.id === id)?.count || 0
}

export const addToCart = async (dispatch, id, cart) => {
  const newCart = cart

  if (cart.map((x) => x.id).indexOf(id) !== -1) {
    newCart.map((x) => {
      if (x.id === id) {
        x.count += 1
      }
      return x
    })
  } else {
    newCart.push({
      id: id,
      count: 1,
    })
  }
  try {
    dispatch(updateCart(newCart))
    Cookies.set('cart', JSON.stringify(newCart))
  } catch (error) {
    return
  }
  return newCart
}

export const removeFromCart = async (
  dispatch,
  id: string,
  cart: Array<ICartItem>
) => {
  const candidateIndex = cart.findIndex((x) => x.id === id)
  if (candidateIndex === -1) return cart
  if (cart[candidateIndex].count > 1) {
    cart[candidateIndex].count -= 1
  } else {
    cart.splice(candidateIndex, 1)
  }
  try {
    dispatch(updateCart(cart))
    Cookies.set('cart', JSON.stringify(cart))
  } catch (error) {
    return cart
  }
  return cart
}

export const clearCart = async (dispatch) => {
  try {
    dispatch(updateCart([]))
    Cookies.set('cart', JSON.stringify([]))
  } catch (error) {
    return
  }
  return []
}

export const filterCart = async (
  dispatch,
  id: string,
  cart: Array<ICartItem>
) => {
  cart = cart.filter((x: ICartItem) => x.id !== id)
  try {
    dispatch(updateCart(cart))
    Cookies.set('cart', JSON.stringify(cart))
  } catch (error) {
    return
  }
  return cart
}

export const formCart = (
  cart: Array<ICartItem>,
  products: Array<IProductProps>
) => {
  return cart.length
    ? Array.from(cart).map((cartItem: ICartItem) => {
        const candidate = Array.from(products).find(
          (product: IProductProps) => product.id === cartItem.id
        )
        if (candidate) {
          return {
            ...candidate,
            count: cartItem.count,
          }
        }
        return
      })
    : []
}

export const updateCount = (
  dispatch,
  cart: Array<ICartItem>,
  id: string,
  count: number
) => {
  const candidateIndex = cart.findIndex((x: ICartItem) => x.id === id)
  if (candidateIndex === -1) return cart
  cart[candidateIndex].count = count
  try {
    dispatch(updateCart(cart))
    Cookies.set('cart', JSON.stringify(cart))
  } catch (error) {
    return cart
  }
  return cart
}

export const getTotal = (cart) => {
  return cart
    .reduce((subtotal: number, item) => subtotal + item.price * item.count, 0)
    .toFixed(2)
}

// === PRODUCTS

export const sortProducts = (
  products: Array<IProductProps>,
  key: SortingType
) => {
  let sortedProducts = Array.from(products)
  switch (key) {
    case 'lowToHigh':
      {
        sortedProducts = sortedProducts.sort(
          (a: IProductProps, b: IProductProps) => a.price - b.price
        )
      }
      break
    case 'highToLow':
      {
        sortedProducts = sortedProducts.sort(
          (a: IProductProps, b: IProductProps) => b.price - a.price
        )
      }
      break
    case 'newest':
      {
        sortedProducts.sort(
          (a: IProductProps, b: IProductProps) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
        )
      }
      break
    case 'rating':
      {
        sortedProducts = sortedProducts.sort(
          (a: IProductProps, b: IProductProps) => b.rating - a.rating
        )
      }
      break
  }
  return sortedProducts
}

export const getProductById = (products, id) => {
  return products.find((x) => x.id === id)
}

// === WISHLIST

export const toggleWishlist = async (dispatch, id, wishlist) => {
  let newWishlist = wishlist

  if (wishlist.map((x) => x.id).indexOf(id) !== -1) {
    newWishlist = wishlist.filter((x) => x.id !== id)
  } else {
    newWishlist.push({
      id: id,
    })
  }
  try {
    await dispatch(updateWishlist(newWishlist))
    Cookies.set('wishlist', JSON.stringify(newWishlist))
  } catch (error) {
    return
  }
  return newWishlist
}

export const inWishlist = (list, id) => {
  return list.length
    ? Array.from(list)
        .map((x: any) => x.id)
        .indexOf(id) !== -1
    : false
}

export const formWishlist = (list, products) => {
  return list.length
    ? Array.from(list).map((item: any) => {
        const candidate = Array.from(products).find(
          (product: any) => product.id === item.id
        )
        return candidate ? candidate : undefined
      })
    : []
}
