import React, { useEffect } from 'react'
import { AppProps } from 'next/app'

import ThemeProvider from '../.storybook/theme-provider'
import { themes } from '../.storybook/preview'

import '../public/styles/global.sass'
import 'sanitize.css'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    const jssStyles: any = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={themes[0]}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
