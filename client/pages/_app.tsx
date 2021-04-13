import React, { useEffect } from 'react'
import App, { AppProps } from 'next/app'
import withApollo from '@graphql/apolloClient'
import { SnackbarProvider } from 'notistack'
import ThemeController from '@controllers/ThemeController'
import ApolloClientProvider from '@providers/ApolloClientProvider'
import AppController from '@controllers/AppController'
import ShopController from '@controllers/ShopController'
import 'sanitize.css'
import '@public/styles/global.sass'

const MyApp = ({
  Component,
  pageProps,
  apollo,
}: AppProps | any): JSX.Element => {
  useEffect(() => {
    const jssStyles: any = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return (
    <ThemeController>
      <AppController>
        <ApolloClientProvider client={apollo}>
          <ShopController>
            <SnackbarProvider>
              <Component {...pageProps} />
            </SnackbarProvider>
          </ShopController>
        </ApolloClientProvider>
      </AppController>
    </ThemeController>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default withApollo(MyApp)
