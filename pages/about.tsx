import React from 'react'
import Layout from '../components/Layout'
import { withApollo } from '../apollo/client'

const AboutPage: React.FunctionComponent = () => (
  <Layout title="О нас">
    <h1>О нас</h1>
    <p>This is the about page</p>
  </Layout>
)

export default withApollo(AboutPage)
