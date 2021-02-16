import { Reducer } from 'react'
import { IThemeProps } from '@interfaces/theme'
import { themes } from '../../.storybook/preview'
import { IActionsProps } from '@interfaces/index'
import * as ACTION_TYPES from '../types/theme'
import Cookies from 'js-cookie'

export const initialState: IThemeProps = {
  theme: themes[Cookies.get('theme') || 0],
  // locale: Cookies.get('locale') || 'ruRU',
}

export const themeReducer: Reducer<IThemeProps, IActionsProps> = (
  state: IThemeProps,
  action: IActionsProps
) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_THEME: {
      Cookies.set('theme', action.payload)
      return {
        ...state,
        theme: themes[action.payload],
      }
    }
    // case ACTION_TYPES.CHANGE_LOCALE: {
    //   Cookies.set('locale', action.payload)
    //   return {
    //     ...state,
    //     locale: action.payload,
    //   }
    // }
    default:
      return state
  }
}
