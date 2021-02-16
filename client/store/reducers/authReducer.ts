import { Reducer } from 'react'
import Cookies from 'js-cookie'

import { IAppProps } from '@interfaces/auth'
import { IActionsProps } from '@interfaces/index'
import * as ACTION_TYPES from '../types/auth'

export const initialState: IAppProps = {
  isAuthenticated: false,
  user: null,
  loading: false,
  token: '',
  avatar: {
    url: '',
    id: '',
  },
}

export const authReducer: Reducer<IAppProps, IActionsProps> = (
  state,
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.REQUEST_AUTH: {
      return {
        ...state,
        loading: true,
      }
    }
    case ACTION_TYPES.STOP_LOADING: {
      return {
        ...state,
        loading: false,
      }
    }
    case ACTION_TYPES.AUTH_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
        token: action.payload.token || state.token || Cookies.get('token'),
      }
    }
    case ACTION_TYPES.AUTH_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      }
    }
    case ACTION_TYPES.LOGOUT: {
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      }
    }
    case ACTION_TYPES.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
      }
    }
    case ACTION_TYPES.LOAD_AVATAR: {
      return {
        ...state,
        avatar: action.payload,
        loading: false,
      }
    }
    default:
      return state
  }
}
