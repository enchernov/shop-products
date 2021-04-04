import React from 'react'
import { NextPage } from 'next'

import Layout from '@components/layouts/Layout'
import Delivery from '@components/delivery'

const DeliveryPage: NextPage = () => (
  <Layout title={'Доставка | FoodMarket'}>
    <Delivery />
  </Layout>
)

export default DeliveryPage
