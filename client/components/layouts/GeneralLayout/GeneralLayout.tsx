import React, { FunctionComponent, useContext } from 'react'
import { Grid } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import clsx from 'clsx'

import { Link } from '@ui/index'
import { logoutUser } from '@utils/auth'
import { AppContext } from '@providers/AppProvider'
import { ILayoutProps } from '@interfaces/layouts'
import { errorMessage } from '@hooks/auth/errorMessage'

import { useStyles } from './GeneralLayout.styles'

const GeneralLayout: FunctionComponent<ILayoutProps> = ({ children }) => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)
  const { isAuthenticated } = state
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

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
              <span
                className={classes.logoutLink}
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
