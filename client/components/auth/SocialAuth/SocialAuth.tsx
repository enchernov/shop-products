import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import { useStyles } from './SocialAuth.styles'
import IconButton from '../../ui/IconButton'

type ServiceType = 'facebook' | 'vk' | 'twitter' | 'google'

// const services: Record<ServiceType, string> = {
//   facebook: 'facebook.com',
//   vk: 'vk.com',
//   twitter: 'twitter.com',
//   google: 'google.com',
// }
interface IService {
  icon: ServiceType
  href: string
}
const services: Array<IService> = [
  {
    icon: 'facebook',
    href: 'facebook.com',
  },
  {
    icon: 'vk',
    href: 'vk.com',
  },
  {
    icon: 'twitter',
    href: 'twitter.com',
  },
  {
    icon: 'google',
    href: 'google.com',
  },
]
const SocialAuth: FunctionComponent = (props) => {
  const classes = useStyles()
  return (
    <Grid
      container
      justify={'space-around'}
      alignContent={'center'}
      className={classes.services}
      {...props}
    >
      {services.map((service, index) => (
        <Grid item key={index}>
          <IconButton
            icon={service.icon}
            href={service.href}
            className={classes[service.icon]}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default SocialAuth
