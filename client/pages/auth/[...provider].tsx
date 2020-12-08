import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '../../components/layouts/Layout'
import { AppContext } from '@providers/AppProvider'

import * as ACTIONS from '@actions/index'

const ConnectPage: NextPage = () => {
  const router = useRouter()
  const { state, dispatch } = useContext(AppContext)
  const { access_token, id_token, provider } = router.query

  useEffect(() => {
    if (access_token) {
      try {
        fetch(
          `${process.env.STRAPI_API_URL}/auth/${provider}/callback?access_token=${access_token}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            dispatch(ACTIONS.authSuccess(data))
          })
      } catch (e) {
        console.log(e)
      }
    }
  }, [access_token])

  return (
    <Layout title={'Connect'}>
      <h1>Hello Next.js 👋</h1>
      <p>Access token: {access_token}</p>
      <p>ID token: {id_token}</p>
      <p>Provider: {provider}</p>
      {state.token ? <p>JWT: {state.token}</p> : null}
      {state.user ? <p>User: {JSON.stringify(state.user)}</p> : null}
    </Layout>
  )
}

export default ConnectPage
