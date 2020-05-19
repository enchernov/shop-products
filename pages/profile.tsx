import React, { FunctionComponent } from 'react'
import Layout from '../components/Layout/Layout'
import Profile from '../components/Auth/Profile'
import { withApollo } from '../apollo/apolloClient'

const ProfilePage: FunctionComponent = () => (
    <Layout title="Профиль">
        <Profile />
    </Layout>
)

export default withApollo(ProfilePage)
