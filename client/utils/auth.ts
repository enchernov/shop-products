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
  Object.keys(Cookies.get()).forEach((value: string) => Cookies.remove(value))
}

export const updateUser = async (userId, dispatch, update, values) => {
  try {
    const { data } = await update({
      variables: {
        input: {
          where: {
            id: userId,
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
    console.log('UPDATE_USER_DATA', data)
    if (data?.updateUser?.user) {
      dispatch(ACTIONS.requestAuth())
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

export const delUser = async (dispatch, deleteUser, payload) => {
  try {
    dispatch(ACTIONS.requestAuth())
    const { data } = await deleteUser({
      variables: {
        input: {
          where: { id: payload },
        },
      },
    })
    if (data) {
      console.log(data)
    }
    if (data.deleteUser?.user) {
      return data.deleteUser
    }
    return data.errors[0]
  } catch (error) {
    // dispatch(ACTIONS.authError())
    return error
  }
}
