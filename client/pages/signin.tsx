import React from 'react'
import { NextPage } from 'next'

import Layout from '../components/layouts/Layout'
import Login from '../components/auth/Login'

const SignInPage: NextPage = () => {
  return (
    <Layout title="Вход">
      <Login />
    </Layout>
  )
}

export default SignInPage
