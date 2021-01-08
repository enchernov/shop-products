import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '@components/layouts/Layout'

const IndexPage: NextPage = () => (
  <Layout title="Главная">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
