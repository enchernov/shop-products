import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import * as ACTIONS from '@actions/auth'
import { AppContext } from '@providers/AppProvider'
import { logoutUser } from '@utils/auth'
import Loader from '@components/ui/Loader'
import { errorMessage } from '@hooks/auth/errorMessage'

const ProviderPage: NextPage = () => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { dispatch } = useContext(AppContext)
  const { provider } = router.query

  useEffect(() => {
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        logoutUser(dispatch)
        router.push('/signin')
      }
    }
    try {
      fetch(
        `${process.env.STRAPI_API_URL}${router.asPath.replace(
          `auth/${provider}`,
          `auth/${provider}/callback`
        )}`
      )
        .then((data) => data.json())
        .then((res) => {
          if (res.user) {
            dispatch(ACTIONS.authSuccess(res))
            Cookies.set('token', res.jwt)
            enqueueSnackbar('Вы успешно вошли', {
              variant: 'success',
            })
            router.push('/my-account')
          } else {
            dispatch(ACTIONS.authError())
            if (res.message.code === 11000) {
              enqueueSnackbar('Такой пользователь уже существует', {
                variant: 'error',
              })
            } else if (Array.isArray(res.message)) {
              enqueueSnackbar('Такой email уже существует', {
                variant: 'error',
              })
            } else {
              enqueueSnackbar('Возникла ошибка', {
                variant: 'error',
              })
            }
            router.push('/signin')
          }
        })
      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    } catch (error) {
      enqueueSnackbar(errorMessage(error), {
        variant: 'error',
      })
      router.push('/signin')
    }
  }, [router, dispatch, enqueueSnackbar, provider])
  return <Loader />
}

export default ProviderPage
