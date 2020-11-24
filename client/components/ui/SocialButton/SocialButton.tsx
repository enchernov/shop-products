import React, { FunctionComponent, ElementType, forwardRef, Ref } from 'react'
import {
  IconButton as MatIconButton,
  IconButtonProps,
  SvgIconProps,
} from '@material-ui/core'
import clsx from 'clsx'
import {
  GoogleIcon,
  FacebookIcon,
  TwitterIcon,
  VKIcon,
} from './icons/SocialIcons'

import { useStyles } from './SocialButton.styles'
import Link from '@ui/Link'

type SocialIconType = 'vk' | 'facebook' | 'twitter' | 'google'

export interface ISocialButtonProps {
  icon: SocialIconType
  onClick?: () => void
  className?: string
  href?: string
}

const iconButtonMap: Record<SocialIconType, ElementType<SvgIconProps>> = {
  facebook: FacebookIcon,
  vk: VKIcon,
  twitter: TwitterIcon,
  google: GoogleIcon,
}

type SocialButtonPropsType = IconButtonProps & ISocialButtonProps

const SocialButton: FunctionComponent<SocialButtonPropsType> = forwardRef(
  ({ icon, onClick, className, href }, ref: Ref<HTMLButtonElement>) => {
    const classes = useStyles()

    const IconComponent = iconButtonMap[icon]

    const classesIconButton = clsx(classes.iconButton, className)
    const linkProps = href ? { href: href, component: Link } : undefined

    return (
      <MatIconButton
        ref={ref}
        size="medium"
        className={classesIconButton}
        onClick={onClick}
        {...linkProps}
      >
        <IconComponent />
      </MatIconButton>
    )
  }
)

SocialButton.displayName = 'SocialButton'

export default SocialButton
