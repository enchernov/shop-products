import React, { FunctionComponent, ReactNode } from 'react'
import Link from 'next/link'

import { useStyles } from './GeneralLayout.styles'

interface IGeneralLayoutProps {
  children: ReactNode
}

const GeneralLayout: FunctionComponent<IGeneralLayoutProps> = ({
  children,
}) => {
  const classes = useStyles()

  return (
    <>
      <header>
        <nav>
          <Link href="/">
            <a>Главная</a>
          </Link>{' '}
          |{' '}
          <Link href="/signup">
            <a>Регистрация</a>
          </Link>{' '}
          |{' '}
          <Link href="/signin">
            <a>Вход</a>
          </Link>{' '}
        </nav>
      </header>
      <main className={classes.root}>{children}</main>
      <footer>
        <hr />
      </footer>
    </>
  )
}

export default GeneralLayout
