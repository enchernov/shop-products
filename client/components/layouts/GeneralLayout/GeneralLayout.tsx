import React, { FunctionComponent, useContext } from 'react'
import { Grid } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { IconButton, Link } from '@ui/index'
import { logoutUser } from '@utils/auth'
import { AppContext } from '@providers/AppProvider'
import { ILayoutProps } from '@interfaces/layouts'
import { errorMessage } from '@hooks/auth/errorMessage'

import { useStyles } from './GeneralLayout.styles'

import { ThemeContext } from '@providers/ThemeProvider'

// import { FoodMarket } from '@public/images/foodMarket.png'

import * as ThemeActions from '@actions/theme'
import { ThemeType } from '@interfaces/theme'
import clsx from 'clsx'

const GeneralLayout: FunctionComponent<ILayoutProps> = ({ children }) => {
  const { state, dispatch } = useContext(AppContext)
  const { dispatch: themeDispatch } = useContext(ThemeContext)
  const { isAuthenticated } = state
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  console.log(state)
  const classes = useStyles()
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
          <Grid
            container
            justify={'space-between'}
            spacing={1}
            alignItems={'center'}
          >
            <Grid item>
              <Link href={'/'} style={{ border: 'none' }}>
                <img
                  src={'/images/foodMarket.png'}
                  alt="FoodMarket"
                  className={classes.logo}
                />
              </Link>
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
                <Grid item>
                  <Link href={'/shop'} className={classes.link}>
                    Магазин
                  </Link>
                </Grid>
                <Grid item>·</Grid>
                <Grid item>
                  <Link href={'/my-account?panel=0'} className={classes.link}>
                    Мой аккаунт
                  </Link>
                </Grid>
                <Grid item>·</Grid>
                <Grid item>
                  <Link href={'/my-account?panel=1'} className={classes.link}>
                    Корзина
                  </Link>
                </Grid>
                <Grid item>·</Grid>
                <Grid item>
                  <Link href={'/my-account?panel=3'} className={classes.link}>
                    Избранное
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={1} alignItems={'center'}>
                <Grid item>
                  <IconButton
                    icon={'sun'}
                    onClick={() => swapTheme('Light')}
                    className={clsx(classes.themeIcon, classes.sun)}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    icon={'moon'}
                    onClick={() => swapTheme('Dark')}
                    className={clsx(classes.themeIcon, classes.moon)}
                  />
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
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            justify={'flex-end'}
            spacing={1}
            alignItems={'center'}
          >
            <Grid item>
              <Link href={'/signup'}>Регистрация</Link>
            </Grid>
            <Grid item>/</Grid>
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
