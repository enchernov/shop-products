import React, { FunctionComponent, ElementType, forwardRef, Ref } from 'react'
import {
  IconButton as MatIconButton,
  IconButtonProps,
  SvgIconProps,
} from '@material-ui/core'
import {
  MenuOutlined,
  MoreVertOutlined,
  SearchOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  FavoriteBorderOutlined,
  Favorite,
  LinkOutlined,
  Photo,
  DeleteOutline,
  AddOutlined,
  RemoveOutlined,
  ClearOutlined,
  ClearAllOutlined,
  ArrowBackOutlined,
  ArrowForwardOutlined,
  WbSunny,
  NightsStay,
  Facebook,
  Twitter,
  Pinterest,
  Instagram,
  LinkedIn,
} from '@material-ui/icons'
import clsx from 'clsx'

import { useStyles } from './IconButton.styles'

export type IconType =
  | 'menu'
  | 'more'
  | 'search'
  | 'visibility'
  | 'visibilityOff'
  | 'favorite'
  | 'favoriteFill'
  | 'link'
  | 'photo'
  | 'delete'
  | 'plus'
  | 'minus'
  | 'cross'
  | 'clear'
  | 'back'
  | 'forward'
  | 'sun'
  | 'moon'
  | 'facebook'
  | 'twitter'
  | 'pinterest'
  | 'instagram'
  | 'linkedIn'

export interface IIconButtonProps extends IconButtonProps {
  icon: IconType
  onClick?: () => void
  disabled?: boolean
  className?: string
  disableFocusRipple?: boolean
}

const iconButtonMap: Record<IconType, ElementType<SvgIconProps>> = {
  menu: MenuOutlined,
  more: MoreVertOutlined,
  search: SearchOutlined,
  visibility: VisibilityOutlined,
  visibilityOff: VisibilityOffOutlined,
  favorite: FavoriteBorderOutlined,
  favoriteFill: Favorite,
  link: LinkOutlined,
  photo: Photo,
  delete: DeleteOutline,
  plus: AddOutlined,
  minus: RemoveOutlined,
  cross: ClearOutlined,
  clear: ClearAllOutlined,
  back: ArrowBackOutlined,
  forward: ArrowForwardOutlined,
  sun: WbSunny,
  moon: NightsStay,
  facebook: Facebook,
  twitter: Twitter,
  pinterest: Pinterest,
  instagram: Instagram,
  linkedIn: LinkedIn,
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
