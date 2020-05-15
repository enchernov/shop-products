import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";

type Props = {
  title?: string
}

const ViewerQuery = gql`
  query {
    viewer {
      id
      username
      email
    }
  }
`;


const Layout: React.FunctionComponent<Props> = ({
  children,
  title = ''
}) => {
    const {data} = useQuery(ViewerQuery,
        {
            pollInterval: 500
        }
    );
    const UserProfile = () => {
        console.log("viewer: ", data?data.viewer:"null");
        if (data && data.viewer !== null || undefined) {
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
    };

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
