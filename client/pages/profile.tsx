import React from 'react'
import { NextPage } from 'next'

import Layout from '@components/layouts/Layout'
import Profile from '@components/account/Profile'
import withAuth from '@hocs/withAuth'

const ProfilePage: NextPage = () => (
  <Layout title="Профиль">
    <Profile />
  </Layout>
)

export default withAuth(ProfilePage)
