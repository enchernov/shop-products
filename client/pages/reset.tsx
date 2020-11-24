import React from 'react'
import { NextPage } from 'next'

import Layout from '../components/layouts/Layout'
import ResetPassword from '../components/auth/ResetPassword'

const ResetPage: NextPage = () => {
  return (
    <Layout title="Восстановить пароль">
      <ResetPassword />
    </Layout>
  )
}

export default ResetPage
