import React, {
  FunctionComponent,
  ElementType,
  forwardRef,
  Ref,
  ReactNode,
} from 'react'
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
  AccountCircle,
  AddCircleOutlineOutlined,
  Favorite,
  FavoriteBorder,
  Edit,
  ExpandMore,
  PhotoCamera,
} from '@material-ui/icons'
import clsx from 'clsx'

import { useStyles } from './IconButton.styles'

type IconType =
  | 'menu'
  | 'more'
  | 'search'
  | 'account'
  | 'visibility'
  | 'visibilityOff'
  | 'create'
  | 'favorite'
  | 'favoriteOff'
  | 'edit'
  | 'expand'
  | 'photo'

export interface IIconButtonProps extends IconButtonProps {
  icon?: IconType
  onClick?: (event: any) => void
  disabled?: boolean
  children?: ReactNode
  className?: string
}

const defaultProps: Partial<IIconButtonProps> = {
  disabled: false,
}

type DefaultProps = Readonly<typeof defaultProps>

type IconButtonPropsType = IIconButtonProps & DefaultProps

const iconButtonMap: Record<IconType, ElementType<SvgIconProps>> = {
  menu: Menu,
  more: MoreVert,
  search: Search,
  account: AccountCircle,
  visibility: Visibility,
  visibilityOff: VisibilityOff,
  create: AddCircleOutlineOutlined,
  favorite: Favorite,
  favoriteOff: FavoriteBorder,
  edit: Edit,
  expand: ExpandMore,
  photo: PhotoCamera,
}

const IconButton: FunctionComponent<IconButtonPropsType> = forwardRef(
  (
    { icon, onClick, disabled, children, className, ...props },
    ref: Ref<HTMLButtonElement>
  ) => {
    const classes = useStyles()
    const classesIconButton = clsx(classes.iconButton, className)
    const IconComponent = icon ? iconButtonMap[icon] : null
    const Component = IconComponent ? <IconComponent /> : children

    return (
      <MatIconButton
        ref={ref}
        size="small"
        className={classesIconButton}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {Component}
      </MatIconButton>
    )
  }
)

IconButton.defaultProps = defaultProps

export default IconButton
