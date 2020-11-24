import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '../../components/layouts/Layout'

const ConnectPage: NextPage = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [jwt, setJwt] = useState(null)
  const { access_token, id_token, provider } = router.query

  useEffect(() => {
    if (access_token) {
      try {
        fetch(
          `http://localhost:1337/auth/google/callback?access_token=${access_token}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setUser(data.user)
            setJwt(data.jwt)
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
      {jwt ? <p>JWT: {jwt}</p> : null}
      {user ? <p>User: {JSON.stringify(user)}</p> : null}
    </Layout>
  )
}

export default ConnectPage
