import Cookies from 'js-cookie'

import { updateCart, updateWishlist } from '@actions/shop'
import { IProductProps, SortingType } from '@interfaces/shop'

// export const updateCart = async (dispatch, updateUser, payload, user) => {
//   console.log('SHOP ACTIONS', 'user:', user, 'payload:', payload)
//   // const formCart = (u, p) => {
//   //   let cart = []
//   //   if (u?.cart) {
//   //     if (p in u?.cart) {
//   //       u.cart[p].count += 1
//   //     } else {
//   //       u.cart.push(p)
//   //     }
//   //     cart = u.cart
//   //   } else {
//   //     cart.push(p)
//   //   }
//   //   return cart
//   // }
//   try {
//     const { data } = await updateUser({
//       variables: {
//         input: {
//           where: {
//             id: user.id,
//           },
//           data: {
//             // cart: formCart(user, payload),
//             cart: [payload],
//           },
//         },
//       },
//     })
//     console.log('SHOP ACTIONS', 'updated user:', data)
//     if (data?.updateUser?.user) {
//       dispatch(ACTIONS.authSuccess(data.updateUser))
//       return data.updateUser.user
//     }
//     return
//   } catch (error) {
//     console.error(error)
//   }
// }

// === CART

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

export const removeFromCart = async (dispatch, id, cart) => {
  const candidate = cart.find((x) => x.id === id)
  const idx = cart.indexOf(candidate)
  if (idx !== -1) {
    if (cart[idx].count > 1) {
      cart[idx].count -= 1
    } else {
      cart.shift(candidate)
    }
    try {
      dispatch(updateCart(cart))
      Cookies.set('cart', JSON.stringify(cart))
    } catch (error) {
      return
    }
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
    dispatch(updateWishlist(newWishlist))
    Cookies.set('wishlist', JSON.stringify(newWishlist))
  } catch (error) {
    return
  }
  return newWishlist
}
