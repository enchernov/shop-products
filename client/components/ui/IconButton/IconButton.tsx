import React, { FunctionComponent, ElementType, forwardRef, Ref } from 'react'
import {
  IconButton as MatIconButton,
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

import { useStyles } from './IconButton.styles'
import clsx from 'clsx'

type IconType = 'menu' | 'more' | 'search' | 'visibility' | 'visibilityOff'

export interface IIconButtonProps {
  icon: IconType
  onClick?: () => void
  disabled?: boolean
  className?: string
  disableFocusRipple?: boolean
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
  (
    { icon, onClick, disabled, className, disableFocusRipple },
    ref: Ref<HTMLButtonElement>
  ) => {
    const classes = useStyles()

    const IconComponent = iconButtonMap[icon]

    const classesIconButton = clsx(classes.iconButton, className)

    return (
      <MatIconButton
        ref={ref}
        size="small"
        className={classesIconButton}
        onClick={onClick}
        disabled={disabled}
        disableFocusRipple={disableFocusRipple}
      >
        <IconComponent />
      </MatIconButton>
    )
  }
)

IconButton.displayName = 'IconButton'

export default IconButton
