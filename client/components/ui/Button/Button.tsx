import React, {
  FunctionComponent,
  ElementType,
  forwardRef,
  Ref,
  ReactNode,
} from 'react'
import {
  Button as MuiButton,
  ButtonProps,
  SvgIconProps,
} from '@material-ui/core'
import { Edit, AddSharp } from '@material-ui/icons'

import Link from '../Link'
import { useStyles } from './Button.styles'

type IconType = 'create' | 'edit'

export interface IButtonProps {
  children: ReactNode
  icon?: IconType
  disabled?: boolean
  href?: string
  className?: string
  fullwidth?: boolean
  onClick?: () => void
}

const defaultProps: Partial<IButtonProps> = {
  disabled: false,
}

type DefaultProps = Readonly<typeof defaultProps>

type ButtonPropsType = ButtonProps & IButtonProps & DefaultProps

const iconButtonMap: Record<IconType, ElementType<SvgIconProps>> = {
  create: AddSharp,
  edit: Edit,
}

const noop = () => {}

const Button: FunctionComponent<ButtonPropsType> = forwardRef(
  (
    { icon, children, disabled, href, onClick, fullWidth },
    ref: Ref<HTMLButtonElement>
  ) => {
    const classes = useStyles()

    const IconComponent: any = icon ? iconButtonMap[icon] : null

    const startIcon = icon ? { startIcon: <IconComponent /> } : undefined

    const linkProps = href ? { href: href, component: Link } : undefined

    return (
      <MuiButton
        ref={ref}
        color="primary"
        variant="contained"
        size="small"
        disabled={disabled}
        className={classes.button}
        {...startIcon}
        {...linkProps}
        fullWidth={fullWidth}
        onClick={!disabled ? onClick : noop}
      >
        {children}
      </MuiButton>
    )
  }
)

Button.defaultProps = defaultProps

export default Button
