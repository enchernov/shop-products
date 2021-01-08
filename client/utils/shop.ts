// import * as ACTIONS from '../actions'
import Cookies from 'js-cookie'

import { updateCart } from '@actions/shop'

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
