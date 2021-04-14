import React from 'react'
import { NextPage } from 'next'

import Layout from '@components/layouts/Layout'
import ResetPassword from '@components/auth/ResetPassword'
import { Grid } from '@material-ui/core'
import { Link } from '@ui/index'

const ResetPage: NextPage = () => (
  <Layout title={'Восстановление пароля'}>
    <Grid container direction={'column'}>
      <Grid item>
        <Link href={'/'} style={{ border: 'none' }}>
          <img
            src="/images/foodMarket.png"
            alt="FoodMarket"
            style={{
              width: '200px',
              margin: '0 calc(50% - 100px)',
              padding: '24px 0',
            }}
          />
        </Link>
      </Grid>
      <Grid item>
        <ResetPassword />
      </Grid>
    </Grid>
  </Layout>
)

export default ResetPage
