import React from 'react'
import { NextPage } from 'next'

import Layout from '@components/layouts/Layout'
import Contacts from '@components/contacts/Contacts'

const ContactsPage: NextPage = () => (
  <Layout title={'Контакты | FoodMarket'}>
    <Contacts />
  </Layout>
)

export default ContactsPage
