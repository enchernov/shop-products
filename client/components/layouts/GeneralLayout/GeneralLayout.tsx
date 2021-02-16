import React, { FunctionComponent, useContext } from 'react'
import { Grid } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { Link } from '@ui/index'
import { logoutUser } from '@utils/auth'
import { AppContext } from '@providers/AppProvider'
import { ILayoutProps } from '@interfaces/layouts'
import { errorMessage } from '@hooks/auth/errorMessage'

import { useStyles } from './GeneralLayout.styles'

import { ThemeContext } from '@providers/ThemeProvider'

import * as ThemeActions from '@actions/theme'
import { ThemeType } from '@interfaces/theme'

const GeneralLayout: FunctionComponent<ILayoutProps> = ({ children }) => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)
  const { dispatch: themeDispatch } = useContext(ThemeContext)
  const { isAuthenticated } = state
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  console.log(state)
  const logout = async () => {
    try {
      await logoutUser(dispatch)
      enqueueSnackbar('Вы успешно вышли', {
        variant: 'success',
      })
      router.push('/signin')
    } catch (error) {
      enqueueSnackbar(errorMessage(error), {
        variant: 'error',
      })
    }
  }

  const swapTheme = async (t: ThemeType) =>
    await themeDispatch(ThemeActions.changeTheme(t))

  return (
    <>
      <header className={classes.header}>
        {isAuthenticated ? (
          <Grid container justify={'space-between'} spacing={1}>
            <Grid item>
              <Grid container spacing={1}>
                <Grid item>
                  <Link href={'/my-account'}>Мой аккаунт</Link>
                </Grid>
                <Grid item>
                  <Link href={'/shop'}>Магазин</Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
                <Grid item>
                  <span
                    className={classes.linkStyle}
                    onClick={() => swapTheme('Light')}
                  >
                    Светлая тема
                  </span>
                </Grid>
                <Grid item>
                  <span
                    className={classes.linkStyle}
                    onClick={() => swapTheme('Dark')}
                  >
                    Тёмная тема
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <span
                className={classes.linkStyle}
                onClick={async () => await logout()}
              >
                Выход
              </span>{' '}
            </Grid>
          </Grid>
        ) : (
          <Grid container justify={'flex-end'} spacing={1}>
            <Grid item>
              <Link href={'/signup'}>Регистрация</Link>
            </Grid>
            <Grid item>
              <Link href={'/signin'}>Вход</Link>
            </Grid>
          </Grid>
        )}
      </header>
      <main className={classes.root}>{children}</main>
    </>
  )
}

export default GeneralLayout
