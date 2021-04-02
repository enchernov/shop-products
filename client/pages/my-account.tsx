import React from 'react'
import { NextPage } from 'next'

import Layout from '@components/layouts/Layout'
import MyAccount from '@components/account/MyAccount'
import withAuth from '@hocs/withAuth'

const MyAccountPage: NextPage = () => (
  <Layout title="Мой аккаунт | FoodMarket">
    <MyAccount />
  </Layout>
)

export default withAuth(MyAccountPage)
