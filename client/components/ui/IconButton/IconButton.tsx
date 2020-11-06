import React, { FunctionComponent, ElementType, forwardRef, Ref } from 'react'
import {
  IconButton as MuiIconButton,
  IconButtonProps,
  SvgIconProps,
} from '@material-ui/core'
import {
  Menu,
  MoreVert,
  Search,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons'

import Link from '../Link'
import { useStyles } from './IconButton.styles'

type IconType = 'menu' | 'more' | 'search' | 'visibility' | 'visibilityOff'

export interface IIconButtonProps {
  icon: IconType
  onClick?: () => void
  disabled?: boolean
  href?: string
}

type IconButtonPropsType = IconButtonProps & IIconButtonProps

const iconButtonMap: Record<IconType, ElementType<SvgIconProps>> = {
  menu: Menu,
  more: MoreVert,
  search: Search,
  visibility: Visibility,
  visibilityOff: VisibilityOff,
}

const IconButton: FunctionComponent<IconButtonPropsType> = forwardRef(
  ({ icon, onClick, disabled, href }, ref: Ref<HTMLButtonElement>) => {
    const classes = useStyles()

    const IconComponent = iconButtonMap[icon]

    const linkProps = href ? { component: Link, href } : undefined

    return (
      <MuiIconButton
        ref={ref}
        size="small"
        className={classes.iconButton}
        onClick={onClick}
        disabled={disabled}
        {...linkProps}
      >
        <IconComponent />
      </MuiIconButton>
    )
  }
)

export default IconButton
