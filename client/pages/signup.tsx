import React from 'react'
import { NextPage } from 'next'

import Layout from '../components/layouts/Layout'
import Register from '../components/auth/Register'

const SignUpPage: NextPage = () => {
  return (
    <Layout title="Регистрация">
      <Register />
    </Layout>
  )
}

export default SignUpPage
