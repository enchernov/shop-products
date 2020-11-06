import React, { FunctionComponent, ElementType, forwardRef, Ref } from 'react'
import {
  IconButton as MatIconButton,
  IconButtonProps,
  SvgIconProps,
  SvgIcon,
} from '@material-ui/core'
import {
  Menu,
  MoreVert,
  Search,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons'
import { useStyles } from './IconButton.styles'
import Link from '../../ui/Link'
// import facebook from '../../../public/images/SocialIcons/facebook-f.svg'
// import vk from '../../../public/images/SocialIcons/vk.svg'
// import twitter from '../../../public/images/SocialIcons/twitter.svg'
// import google from '../../../public/images/SocialIcons/google.svg'

type IconType =
  | 'menu'
  | 'more'
  | 'search'
  | 'visibility'
  | 'visibilityOff'
  | 'vk'
  | 'facebook'
  | 'twitter'
  | 'google'

export interface IIconButtonProps {
  icon: IconType
  onClick?: () => void
  disabled?: boolean
  href?: string
  className?: string
}

type IconButtonPropsType = IconButtonProps & IIconButtonProps

const iconButtonMap: Record<IconType, ElementType<SvgIconProps>> = {
  menu: Menu,
  more: MoreVert,
  search: Search,
  visibility: Visibility,
  visibilityOff: VisibilityOff,
  facebook: function FacebookIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 320 512">
        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
      </SvgIcon>
    )
  },
  vk: function VkIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 576 512">
        <path d="M545 117.7c3.7-12.5 0-21.7-17.8-21.7h-58.9c-15 0-21.9 7.9-25.6 16.7 0 0-30 73.1-72.4 120.5-13.7 13.7-20 18.1-27.5 18.1-3.7 0-9.4-4.4-9.4-16.9V117.7c0-15-4.2-21.7-16.6-21.7h-92.6c-9.4 0-15 7-15 13.5 0 14.2 21.2 17.5 23.4 57.5v86.8c0 19-3.4 22.5-10.9 22.5-20 0-68.6-73.4-97.4-157.4-5.8-16.3-11.5-22.9-26.6-22.9H38.8c-16.8 0-20.2 7.9-20.2 16.7 0 15.6 20 93.1 93.1 195.5C160.4 378.1 229 416 291.4 416c37.5 0 42.1-8.4 42.1-22.9 0-66.8-3.4-73.1 15.4-73.1 8.7 0 23.7 4.4 58.7 38.1 40 40 46.6 57.9 69 57.9h58.9c16.8 0 25.3-8.4 20.4-25-11.2-34.9-86.9-106.7-90.3-111.5-8.7-11.2-6.2-16.2 0-26.2.1-.1 72-101.3 79.4-135.6z" />
      </SvgIcon>
    )
  },
  twitter: function TwitterIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 512 512">
        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
      </SvgIcon>
    )
  },
  google: function GoogleIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 488 512">
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
      </SvgIcon>
    )
  },
}

const IconButton: FunctionComponent<IconButtonPropsType> = forwardRef(
  (
    { icon, onClick, disabled, href, className },
    ref: Ref<HTMLButtonElement>
  ) => {
    const classes = useStyles()
    const IconComponent = iconButtonMap[icon]
    const linkProps = href
      ? {
          component: Link,
          href,
        }
      : undefined
    const getClassName = className
      ? classes.iconButton + ' ' + className
      : classes.iconButton
    return (
      <MatIconButton
        ref={ref}
        size="small"
        className={getClassName}
        onClick={onClick}
        disabled={disabled}
        {...linkProps}
      >
        <IconComponent />
      </MatIconButton>
    )
  }
)

export default IconButton
