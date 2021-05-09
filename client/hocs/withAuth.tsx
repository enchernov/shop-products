import React, { useEffect, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'

import ME from '@graphql/queries/Me'
import { AppContext } from '@providers/AppProvider'
import * as ACTIONS from '@actions/auth'
import * as SHOP_ACTIONS from '@actions/shop'
import { logoutUser } from '@utils/auth'
import Loader from '@components/ui/Loader'
import { ShopContext } from '@providers/ShopProvider'
import { loadAvatar } from '@actions/auth'

const withAuth = (Component: any) => {
  const Wrapper = (props) => {
    const { state, dispatch } = useContext(AppContext)
    const { dispatch: shopDispatch } = useContext(ShopContext)
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()

    const { data, loading, error } = useQuery(ME)

    useEffect(() => {
      const syncLogout = (event) => {
        if (event.key === 'logout') {
          logoutUser(dispatch)
          router.push('/signin')
        }
      }
      window.addEventListener('storage', syncLogout)
      if (!loading && data) {
        dispatch(ACTIONS.authSuccess({ user: { ...data.me, ...data.self } }))

        const dataWishlist = JSON.parse(data?.self?.wishlist || '[]')
        dataWishlist.length > 0 &&
          shopDispatch(SHOP_ACTIONS.updateWishlist(dataWishlist))
        data?.self?.avatar?.url?.length &&
          dispatch(
            loadAvatar({
              url: data?.self?.avatar?.url || '',
              id: data?.self?.avatar?.id || '',
            })
          )
      }

      if (!loading && (error || !data)) {
        enqueueSnackbar('Вы не авторизованы', { variant: 'error' })
        syncLogout({ key: 'logout' })
      }

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [data, loading])

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
