import React from 'react'
import { NextPage } from 'next'
import ResetPassword from "../../components/auth/ResetPassword";
import Layout from '../../components/layouts/Layout'

const ResetPasswordPage: NextPage = () => {
  return (
    <Layout title="Восстановление пароля">
      <ResetPassword />
    </Layout>
  )
}

export default ResetPasswordPage
