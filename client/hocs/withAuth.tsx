import React, { useEffect, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'

import ME from '@graphql/queries/Me'
import { AppContext } from '@providers/AppProvider'
import * as ACTIONS from '@actions/auth'
import { logoutUser } from '@utils/auth'
import Loader from '@components/ui/Loader'

const withAuth = (Component: any) => {
  const Wrapper = (props) => {
    const { state, dispatch } = useContext(AppContext)
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()

    const { data, loading, error } = useQuery(ME)
    // console.log(data, loading, state)

    useEffect(() => {
      const syncLogout = (event) => {
        if (event.key === 'logout') {
          logoutUser(dispatch)
          router.push('/signin')
        }
      }
      window.addEventListener('storage', syncLogout)
      if (!loading && data) {
        // console.log('ME: ', data.me)
        // console.log('SELF: ', data.self)
        dispatch(ACTIONS.authSuccess({ user: { ...data.me, ...data.self } }))
      }
      //
      // if (!loading && !state.isAuthenticated && !state.user) {
      //   enqueueSnackbar('Вы не авторизованы', { variant: 'error' })
      //   syncLogout({ key: 'logout' })
      // }

      if (error) {
        enqueueSnackbar('Вы не авторизованы', { variant: 'error' })
        syncLogout({ key: 'logout' })
      }
      // if (!loading && !state.token && !state.loading) {
      //   syncLogout({ key: 'logout' })
      // }
      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [data, loading, error])

    if (state.token) {
      return <Component {...props} />
    }

    return <Loader />
  }

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps
  }

  return React.memo(Wrapper)
}

export default withAuth
