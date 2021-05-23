import * as ACTIONS from '@actions/auth'
import Cookies from 'js-cookie'
import { getTotal } from '@utils/shop'
import { ChangeEvent } from 'react'
import { loadAvatar, requestAuth, stopLoading } from '@actions/auth'
import { v4 as uuidv4 } from 'uuid'
import { updUser } from '@utils/auth'
import { updateCart } from '@actions/shop'
import {IOrderProps} from "@interfaces/shop";

// === DASHBOARD
export const addAvatar = async (
  e: ChangeEvent<HTMLInputElement>,
  userId,
  dispatch,
  upload
) => {
  const file = (e.target.files as any)[0]
  const fileData = {
    file: file,
    ref: 'user',
    refId: userId,
    field: 'avatar',
    source: 'users-permissions',
  }
  if (file) {
    try {
      dispatch(requestAuth())
      const { data } = await upload({
        variables: fileData,
      })
      if (data) {
        dispatch(loadAvatar(data.upload))
        return data.upload
      } else return
    } catch (e) {
      dispatch(stopLoading())
    }
  }
}

export const delAvatar = async (dispatch, deleteFile, fileId) => {
  try {
    dispatch(requestAuth())
    dispatch(loadAvatar({ url: '', id: '' }))
    const { data } = await deleteFile({
      variables: {
        input: {
          where: { id: fileId },
        },
      },
    })
    if (data.deleteFile?.file) {
      dispatch(stopLoading())
      return data.deleteFile
    }
    dispatch(stopLoading())
    return data.errors[0]
  } catch (error) {
    dispatch(stopLoading())
    return error
  }
}

// === ADDRESSES

export const addAddress = async (user, dispatch, updateMutation, address) => {
  try {
    const id = uuidv4()
    const oldAddresses = JSON.parse(user?.addresses || '[]')
    const newAddresses = [...oldAddresses, { id, address }]
    await updUser(dispatch, updateMutation, user.id, {
      addresses: JSON.stringify(newAddresses),
    })
  } catch (e) {
    console.log(e)
  }
}

export const delAddress = async (user, dispatch, updateMutation, id) => {
  try {
    const oldAddresses = JSON.parse(user?.addresses || '[]')
    const newAddresses = oldAddresses.filter((x) => x.id !== id)
    await updUser(dispatch, updateMutation, user.id, {
      addresses: JSON.stringify(newAddresses),
    })
  } catch (e) {
    console.log(e)
  }
}

// === CHECKOUT

export const makeOrder = async (
  dispatch,
  createOrder,
  user,
  cart,
  address,
  token
) => {
  try {
    const { data } = await createOrder({
      variables: {
        input: {
          data: {
            user: user.id,
            total: getTotal(cart),
            products: JSON.stringify(cart),
            address: address,
            token: token?.token.id || '',
          },
        },
      },
    })
    if (data.createOrder) {
      dispatch(
        ACTIONS.updateUserSuccess({
          ...user,
          orders: user?.orders.concat([data.createOrder.order]),
        })
      )
    }
    return data
  } catch (e) {
    console.log(e)
  }
}

// === ORDERS

export const makeDate = (s) => {
  try {
    const [d, t] = s.split('T')
    const D = d.split('-')
    const T = t.split(':')
    T[2] = T[2].split('.')[0]
    return `${D[2]}.${D[1]}.${D[0]} ${T.join(':')}`
  } catch (e) {
    return s
  }
}

export const makeOrderAgain = async (
  dispatch,
  order,
  products,
  enqueueSnackbar
) => {
  try {
    const newCart = [] as Array<IOrderProps>
    const items = JSON.parse(order.products) || []
    items.map((x) => {
      const candidate = products.find((y) => y.id == x?.id)
      if (candidate.available < 1) {
        enqueueSnackbar(`Товара '${x.name}' нет в наличии`, {
          variant: 'warning',
        })
      } else if (candidate && candidate.available < x.count) {
        newCart.push({ ...x, count: candidate.available })
        enqueueSnackbar(`Добавлено макс. кол-во товара '${x.name}'`, {
          variant: 'info',
        })
      } else if (candidate) {
        newCart.push(x)
      } else {
        enqueueSnackbar('Возникла ошибка', { variant: 'error' })
      }
    })
    try {
      if (newCart.length > 0) {
        dispatch(updateCart(newCart))
        Cookies.set('cart', JSON.stringify(newCart))
        enqueueSnackbar('Заказ сформирован', { variant: 'success' })
      }
      return
    } catch (error) {
      enqueueSnackbar('Возникла ошибка', { variant: 'error' })
      return
    }
  } catch (error) {
    console.log(error)
  }
}

// === COMMUNICATION

export const subscribeEmail = async (
  dispatch,
  createEmailSubscriber,
  user,
  email
) => {
  try {
    const { data } = await createEmailSubscriber({
      variables: {
        input: {
          data: {
            user: user.id,
            email: email,
          },
        },
      },
    })
    if (data.createEmailSubscriber) {
      dispatch(
        ACTIONS.updateUserSuccess({
          ...user,
          email_subscriber: data.createEmailSubscriber,
        })
      )
    }
    return data
  } catch (e) {
    console.log(e)
  }
}

export const unsubscribeEmail = async (
  dispatch,
  deleteEmailSubscriber,
  user,
  subscribeId
) => {
  // console.log(dispatch, deleteEmailSubscriber, user, subscribeId)
  try {
    const { data } = await deleteEmailSubscriber({
      variables: {
        input: {
          where: {
            id: subscribeId,
          },
        },
      },
    })
    if (data.deleteEmailSubscriber) {
      dispatch(
        ACTIONS.updateUserSuccess({
          ...user,
          email_subscriber: null,
        })
      )
    }
    return data
  } catch (e) {
    console.log(e)
  }
}

export const makeTicket = async (createTicket, message, name, email, user) => {
  try {
    const { data } = await createTicket({
      variables: {
        input: {
          data: {
            message,
            name,
            email,
            user: user.id,
          },
        },
      },
    })
    return data
  } catch (e) {
    console.log(e)
  }
}
