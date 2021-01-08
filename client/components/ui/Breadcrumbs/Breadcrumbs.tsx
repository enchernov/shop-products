import React, { FunctionComponent } from 'react'
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { Link } from '@ui/index'

import { useStyles } from './Breadcrumbs.styles'

const breadcrumbNameMap: { [key: string]: string } = {
  '/my-account': 'Мой аккаунт',
}

const Breadcrumbs: FunctionComponent = () => {
  const classes = useStyles()
  const router = useRouter()
  const pathnames = router.pathname.split('/').filter((x) => x)
  return (
    <MuiBreadcrumbs className={classes.breadcrumbs}>
      <Link href={'/'} color={'text'}>
        Главная
      </Link>
      {pathnames.map((_, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        return last ? (
          <Typography variant={'body1'} className={classes.current} key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <Link color="primary" href={to} key={to}>
            {breadcrumbNameMap[to]}
          </Link>
        )
      })}
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs
