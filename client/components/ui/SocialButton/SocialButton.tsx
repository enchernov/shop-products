import React, { FunctionComponent, ElementType, forwardRef, Ref } from 'react'
import {
  IconButton as MuiIconButton,
  IconButtonProps,
  SvgIconProps,
} from '@material-ui/core'
import clsx from 'clsx'
import {
  GoogleIcon,
  FacebookIcon,
  InstagramIcon,
  VKIcon,
} from './icons/SocialIcons'
import { Link } from '@ui/index'

import { useStyles } from './SocialButton.styles'

type SocialIconType = 'vk' | 'facebook' | 'instagram' | 'google'

export interface ISocialButtonProps {
  icon: SocialIconType
  onClick?: () => void
  className?: string
  href?: string
}

const iconButtonMap: Record<SocialIconType, ElementType<SvgIconProps>> = {
  facebook: FacebookIcon,
  vk: VKIcon,
  instagram: InstagramIcon,
  google: GoogleIcon,
}

type SocialButtonPropsType = IconButtonProps & ISocialButtonProps

const SocialButton: FunctionComponent<SocialButtonPropsType> = forwardRef(
  ({ icon, onClick, className, href }, ref: Ref<HTMLButtonElement>) => {
    const classes = useStyles()

    const IconComponent = iconButtonMap[icon]

    const classesIconButton = clsx(classes.button, className)
    const linkProps = href ? { href: href, component: Link } : undefined

    return (
      <MuiIconButton
        ref={ref}
        size="medium"
        className={classesIconButton}
        onClick={onClick}
        {...linkProps}
      >
        <IconComponent />
      </MuiIconButton>
    )
  }
)

export default SocialButton
