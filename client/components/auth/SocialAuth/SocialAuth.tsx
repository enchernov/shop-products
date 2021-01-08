import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'
import clsx from 'clsx'

import { SocialButton } from '@ui/index'
import { useStyles as useButtonStyles } from '@ui/SocialButton/SocialButton.styles'

import { useStyles } from './SocialAuth.styles'

type ServiceType = 'facebook' | 'vk' | 'instagram' | 'google'
const services: Array<ServiceType> = ['facebook', 'vk', 'instagram', 'google']

const SocialAuth: FunctionComponent = (props) => {
  const classes = useStyles()
  const buttonClasses = useButtonStyles()
  return (
    <Grid container justify="center" alignContent="center" {...props}>
      {services.map((service) => (
        <Grid item key={service}>
          <SocialButton
            icon={service}
            key={service}
            className={clsx(classes[service], buttonClasses[service])}
            href={`${process.env.STRAPI_API_URL}/connect/${service}`}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default SocialAuth
