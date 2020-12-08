import React, { FunctionComponent, ReactNode, useContext } from 'react'
import { Grid } from '@material-ui/core'
import { Link } from '@ui/index'
import { useRouter } from 'next/router'

import { logoutUser } from '@utils/auth'
import { AppContext } from '@providers/AppProvider'

import { useStyles } from './GeneralLayout.styles'

interface IGeneralLayoutProps {
  children: ReactNode
}

const GeneralLayout: FunctionComponent<IGeneralLayoutProps> = ({
  children,
}) => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)
  const router = useRouter()

  const logout = async () => {
    logoutUser(dispatch)
    await router.push('/signin')
  }

  return (
    <>
      <header className={classes.header}>
        {state.isAuthenticated ? (
          <Grid container justify={'space-between'} spacing={1}>
            <Grid item>
              <Link href={'/profile'}>Мой аккаунт</Link>
            </Grid>
            <Grid item>
              <span className={classes.logoutLink} onClick={logout}>
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
      <footer>
        <hr />
      </footer>
    </>
  )
}

export default GeneralLayout
