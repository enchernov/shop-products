import React from 'react'
import { NextPage } from 'next'
import Layout from '@components/layouts/Layout'
import About from '@components/about-us/About'

const AboutPage: NextPage = () => (
  <Layout title="О нас | FoodMarket">
    <About />
  </Layout>
)

export default AboutPage
