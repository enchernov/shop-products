import React, { FunctionComponent, ReactNode } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import AuthLayout from '../AuthLayout'
import GeneralLayout from '../GeneralLayout'

import { useStyles } from './Layout.style'

type ILayoutProps = {
  children: ReactNode
  title?: string
}

const Layout: FunctionComponent<ILayoutProps> = ({ children, title = '' }) => {
  const classes = useStyles()
  const router = useRouter()

  const changeLayout = () => {
    switch (router.pathname) {
      case '/':
        return <GeneralLayout>{children}</GeneralLayout>
      case '/signin':
      case '/signup':
      case '/reset':
        return <AuthLayout>{children}</AuthLayout>
    }
  }

  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {changeLayout()}
    </div>
  )
}

export default Layout
