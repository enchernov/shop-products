import React from 'react'
import { NextPage } from 'next'

import Register from '../components/auth/Register'
import Layout from '@components/layouts/Layout'

const SignUpPage: NextPage = () => {
  return (
    <Layout title="Регистрация">
      <Register />
    </Layout>
  )
}

export default SignUpPage
