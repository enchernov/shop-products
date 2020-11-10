import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import SocialButton from '../../ui/SocialButton/SocialButton'

import { useStyles } from './SocialAuth.styles'

type ServiceType = 'facebook' | 'vk' | 'twitter' | 'google'

interface ISocialAuthProps {
  icon: ServiceType
}

const services: Array<ISocialAuthProps> = [
  {
    icon: 'facebook',
  },
  {
    icon: 'vk',
  },
  {
    icon: 'twitter',
  },
  {
    icon: 'google',
  },
]

const SocialAuth: FunctionComponent = (props) => {
  const classes = useStyles()

  return (
    <Grid
      container
      justify='center'
      alignContent='center'
      {...props}
    >
      {services.map((service) => (
        <Grid item key={service.icon}>
          <SocialButton
            icon={service.icon}
            key={service.icon}
            className={classes[service.icon]}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default SocialAuth
