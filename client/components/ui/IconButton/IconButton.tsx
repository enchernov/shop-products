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
  FavoriteBorder,
  Link,
  Photo,
} from '@material-ui/icons'
import clsx from 'clsx'

import { useStyles } from './IconButton.styles'

type IconType =
  | 'menu'
  | 'more'
  | 'search'
  | 'visibility'
  | 'visibilityOff'
  | 'favorite'
  | 'link'
  | 'photo'

export interface IIconButtonProps extends IconButtonProps {
  icon: IconType
  onClick?: () => void
  disabled?: boolean
  className?: string
  disableFocusRipple?: boolean
}

const iconButtonMap: Record<IconType, ElementType<SvgIconProps>> = {
  menu: Menu,
  more: MoreVert,
  search: Search,
  visibility: Visibility,
  visibilityOff: VisibilityOff,
  favorite: FavoriteBorder,
  link: Link,
  photo: Photo,
}

const IconButton: FunctionComponent<IIconButtonProps> = forwardRef(
  (
    { icon, onClick, disabled, className, disableFocusRipple, ...props },
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
        {...props}
      >
        <IconComponent />
      </MatIconButton>
    )
  }
)

export default IconButton
