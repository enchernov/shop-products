import Cookies from 'js-cookie'

import * as ACTIONS from '../actions'

export const registerUser = async (dispatch, register, payload) => {
  try {
    dispatch(ACTIONS.requestAuth())
    const { data } = await register({
      variables: {
        input: {
          ...payload,
          passwordConfirm: undefined,
        },
      },
    })
    if (data.user) {
      dispatch(ACTIONS.authSuccess(data))
      Cookies.set('currentUser', data)
      return data
    }
    dispatch(ACTIONS.authError(data.errors[0]))
    return
  } catch (error) {
    dispatch(ACTIONS.authError(error))
  }
}

export const loginUser = async (dispatch, login, payload) => {
  try {
    dispatch(ACTIONS.requestAuth())
    const { data } = await login({
      variables: {
        input: payload,
      },
    })
    if (data.user) {
      dispatch(ACTIONS.authSuccess(data))
      Cookies.set('currentUser', data)
      return data
    }
    dispatch(ACTIONS.authError(data.errors[0]))
    return
  } catch (error) {
    dispatch(ACTIONS.authError(error))
  }
}

export const logoutUser = async (dispatch) => {
  dispatch(ACTIONS.logout())
  Cookies.remove('currentUser')
  Cookies.remove('token')
}
