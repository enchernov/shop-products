import React from 'react'
import { NextPage } from 'next'

import Register from '../components/auth/Register'
import Layout from '@components/layouts/Layout'
import { Grid } from '@material-ui/core'
import { Link } from '@ui/index'

const SignUpPage: NextPage = () => {
  return (
    <Layout title="Регистрация | FoodMarket">
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
          <Register />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default SignUpPage
