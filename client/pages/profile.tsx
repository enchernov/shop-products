import React from 'react'
import { NextPage } from 'next'

import Layout from '../components/layouts/Layout'
import Profile from '../components/dashboard/Profile'
import withAuth from '../hocs/withAuth'

const ProfilePage: NextPage = () => {
  return (
    <Layout title="Профиль">
      <Profile />
    </Layout>
  )
}

export default withAuth(ProfilePage)
