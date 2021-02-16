import * as ACTION_TYPES from '../types/theme'
import { ThemeType } from '@interfaces/theme'

export const changeTheme = (value: ThemeType) => {
  let index = 0
  switch (value) {
    case 'Light':
      {
        index = 0
      }
      break
    case 'Dark':
      index = 1
      break
    default:
      {
        index = 0
      }
      break
  }
  return {
    type: ACTION_TYPES.CHANGE_THEME,
    payload: index,
  }
}
//
// export const changeLocale = (value: LocalesType) => {
//   return {
//     type: ACTION_TYPES.CHANGE_LOCALE,
//     payload: value,
//   }
// }
