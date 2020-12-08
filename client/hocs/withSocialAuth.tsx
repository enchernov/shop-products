import React, { useEffect, useContext } from 'react'
import { useQuery } from '@apollo/client'

import { AppContext } from '@providers/AppProvider'
import { logoutUser } from '@utils/auth'
import * as ACTIONS from '@actions/index'

import GetUser from '@graphql/queries/GetUser'

const withAuth = (Component: any) => {
  const Wrapper = (props) => {
    const { state, dispatch } = useContext(AppContext)

    const syncLogout = (event) => {
      if (event.key === 'logout') {
        logoutUser(dispatch)
      }
    }

    const { data, loading, error } = useQuery(GetUser)

    useEffect(() => {
      window.addEventListener('storage', syncLogout)
      if (!loading && data) {
        dispatch(ACTIONS.authSuccess(data))
      }
      if (error) {
        console.error(error)
        syncLogout({ key: 'logout' })
      }
      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [data, loading, error])

    if (state.token) {
      return <Component {...props} />
    }

    return <h1>Загрузка...</h1>
  }

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps
  }

  return Wrapper
}

export default withAuth
