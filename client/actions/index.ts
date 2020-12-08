import * as ACTION_TYPES from './types'

export const requestAuth = () => {
  return {
    type: ACTION_TYPES.REQUEST_AUTH,
  }
}

export const authSuccess = (value) => {
  return {
    type: ACTION_TYPES.AUTH_SUCCESS,
    payload: value,
  }
}

export const authError = (error) => {
  return {
    type: ACTION_TYPES.AUTH_ERROR,
    error: error,
  }
}

export const logout = () => {
  return {
    type: ACTION_TYPES.LOGOUT,
  }
}
