import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

type Props = {
  title?: string
}

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      username
      email
    }
  }
`;

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = '',
}) => {
  let { data } = useQuery(ViewerQuery);

  const UserProfile = () => {
    console.log(data);
    if (data && data.viewer) {
      return (
        <>
          <Link href="#">
            <a>Профиль - {data.viewer.username}</a>
          </Link>{' '}
          |{' '}
          <Link href="signout">
            <a>Выход</a>
          </Link>
        </>
      )
    }
    else {
      return (
        <>
          <Link href="signup">
            <a>Регистрация</a>
          </Link>{' '}
          |{' '}
          <Link href="signin">
            <a>Вход</a>
          </Link>
        </>
      )
    }
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Главная</a>
          </Link>{' '}
          |{' '}
          <Link href="about">
            <a>О нас</a>
          </Link>{' '}
          |{' '}
          <UserProfile />
        </nav>
      </header>
      {children}
      <footer>
        <hr/>
      </footer>
    </div>
  )
}

export default Layout
