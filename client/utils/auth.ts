import Cookies from 'js-cookie'

import * as ACTIONS from '@actions/auth'

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
    console.log(data)
    if (data.register?.user) {
      dispatch(ACTIONS.authSuccess(data.register))
      return data.register
    }
    dispatch(ACTIONS.authError())
    return data.errors[0]
  } catch (error) {
    dispatch(ACTIONS.authError())
    return error
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
    if (data.login?.user) {
      dispatch(ACTIONS.authSuccess(data.login))
      Cookies.set('token', data.login.jwt)
      return data.login
    }
    dispatch(ACTIONS.authError())
    return data.errors[0]
  } catch (error) {
    dispatch(ACTIONS.authError())
    return error
  }
}

export const logoutUser = async (dispatch) => {
  dispatch(ACTIONS.logout())
  Cookies.remove('token')
}

export const updateUser = async (state, dispatch, update, values) => {
  try {
    const { data } = await update({
      variables: {
        input: {
          where: {
            id: state.user.id,
          },
          data: {
            ...values,
            password: values.newPassword?.length
              ? values.newPassword
              : values.password,
            newPassword: undefined,
            newPasswordConfirm: undefined,
          },
        },
      },
    })
    if (data.updateUser?.user) {
      dispatch(ACTIONS.updateUserSuccess(data.updateUser.user))
      return data.updateUser
    }
    return data.errors[0]
  } catch (error) {
    return error
  }
}

export const forgotPasswordUser = async (dispatch, forgotPassword, values) => {
  try {
    dispatch(ACTIONS.requestAuth())
    const { data } = await forgotPassword({
      variables: {
        ...values,
      },
    })
    if (data.forgotPassword?.ok) {
      return data.forgotPassword
    }
    dispatch(ACTIONS.authError())
    return data.errors[0]
  } catch (error) {
    dispatch(ACTIONS.authError())
    return error
  }
}

export const resetPasswordUser = async (
  dispatch,
  resetPassword,
  values,
  code
) => {
  try {
    dispatch(ACTIONS.requestAuth())
    const { data } = await resetPassword({
      variables: {
        ...values,
        code,
      },
    })
    if (data.resetPassword?.user) {
      dispatch(ACTIONS.updateUserSuccess(data.resetPassword))
      return data.resetPassword
    }
    dispatch(ACTIONS.authError())
    return data.errors[0]
  } catch (error) {
    dispatch(ACTIONS.authError())
    return error
  }
}

export const confirmEmailUser = async (
  dispatch,
  emailConfirmation,
  confirmation
) => {
  try {
    const { data } = await emailConfirmation({
      variables: {
        input: {
          confirmation,
        },
      },
    })
    if (data.emailConfirmation?.user) {
      dispatch(ACTIONS.authSuccess(data.emailConfirmation))
      Cookies.set('token', data.emailConfirmation.jwt)
      return data.emailConfirmation
    }
    dispatch(ACTIONS.authError())
    return data.errors[0]
  } catch (error) {
    dispatch(ACTIONS.authError())
    return error
  }
}
