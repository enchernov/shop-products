import React, { FunctionComponent, ReactNode } from 'react'

import { useStyles } from './AuthLayout.styles'

interface IAuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FunctionComponent<IAuthLayoutProps> = ({ children }) => {
  const classes = useStyles()

  return <main className={classes.root}>{children}</main>
}

export default AuthLayout
