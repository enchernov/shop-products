/* eslint-disable react/jsx-filename-extension */
import * as React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles'

import { themes } from '../.storybook/preview'

interface IMyDocument {
  url: string
  title: string
  description: string
}

class MyDocument extends Document implements IMyDocument {
  url = process.env.HOST as string
  title = 'FoodMarket'
  description = 'Покупка и доставка еды онлайн'

  render(): JSX.Element {
    return (
      <Html lang="ru">
        <Head>
          <meta name="description" content={this.description} />
          <meta name="theme-color" content={themes[0].palette.primary.main} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={this.title} />
          <meta property="og:url" content={this.url} />
          <meta property="og:description" content={this.description} />
          <meta property="og:site_name" content={this.title} />
          <meta property="og:locale" content="ru" />
          <meta property="og:image" content={`${this.url}/ogp.png`} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@site_account" />
          <meta name="twitter:creator" content="@individual_account" />
          <meta name="twitter:title" content={this.title} />
          <meta name="twitter:description" content={this.description} />
          <meta name="twitter:image" content={`${this.url}/ogp.png`} />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="./images/icons/ms-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="./images/icons/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="./images/icons/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="./images/icons/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="./images/icons/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="./images/icons/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="./images/icons/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="./images/icons/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="./images/icons/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="./images/icons/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="./images/icons/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="./images/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="./images/icons/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="./images/icons/favicon-16x16.png"
          />
          <link rel="icon" href="./images/icons/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const materialUiServerStyleSheets = new MaterialUiServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        materialUiServerStyleSheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      materialUiServerStyleSheets.getStyleElement(),
    ],
  }
}

export default MyDocument
