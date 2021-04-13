import { Theme } from '@material-ui/core/styles'
// import * as locales from '@material-ui/core/locale'

export type ThemeType = 'Light' | 'Dark'

// export type LocalesType = keyof typeof locales

export interface IThemeProps {
  theme: Theme & { name?: string }
  // locale: LocalesType
}
