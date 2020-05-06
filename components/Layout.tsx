import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
//import { useRouter } from 'next/router'

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
  title = 'This is the default title',
}) => {
    //const router = useRouter();
    let { data, loading } = useQuery(ViewerQuery);
    /*
    if (!loading && (data.viewer === null) && (typeof window !== 'undefined')) {
        router.push('/signin')
    }*/

  const UserProfile = () => {
    if (!loading && data && data.viewer) {
      return (
        <>
          <Link href="/profile">
            <a>Profile - {data.viewer.username}</a>
          </Link>{' '}
          |{' '}
          <Link href="/signout">
            <a>Signout</a>
          </Link>
        </>
      )
    }
    else {
      return (
        <>
          <Link href="/signup">
            <a>Signup</a>
          </Link>{' '}
          |{' '}
          <Link href="/signin">
            <a>Signin</a>
          </Link>
          |{' '}
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
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href="/about">
            <a>About</a>
          </Link>{' '}
          |{' '}
          <UserProfile/>
        </nav>
      </header>
      {children}
      <footer>
        <hr/>
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  )
}

export default Layout
