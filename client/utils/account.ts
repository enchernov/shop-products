import * as ACTIONS from '@actions/auth'
import { getTotal } from '@utils/shop'
import { ChangeEvent } from 'react'
import { loadAvatar, requestAuth, stopLoading } from '@actions/auth'

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
      if (data) dispatch(loadAvatar(data.upload))
      else return
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

export const addAddress = async (user, dispatch, createAddress, address) => {
  try {
    const { data } = await createAddress({
      variables: {
        input: {
          data: {
            address,
            users_permissions_user: user?.id || '',
          },
        },
      },
    })
    if (data.createAddress) {
      dispatch(
        ACTIONS.updateUserSuccess({
          ...user,
          addresses: user?.addresses.concat([data.createAddress.address]),
        })
      )
    }
  } catch (e) {
    console.log(e)
  }
}

export const delAddress = async (user, dispatch, deleteAddress, id) => {
  try {
    const { data } = await deleteAddress({
      variables: {
        input: {
          where: {
            id,
          },
        },
      },
    })
    if (data.deleteAddress) {
      dispatch(
        ACTIONS.updateUserSuccess({
          ...user,
          addresses: user?.addresses.filter(
            (x) => x.id !== data.deleteAddress.address.id
          ),
        })
      )
    }
  } catch (e) {
    console.log(e)
  }
}

// === CHECKOUT

export const makeOrder = async (createOrder, userId, cart, address, token) => {
  const { data } = await createOrder({
    variables: {
      input: {
        data: {
          user: userId,
          total: getTotal(cart),
          products: JSON.stringify(cart),
          address: address,
          token: token?.token.id || '',
        },
      },
    },
  })
  return data
}
