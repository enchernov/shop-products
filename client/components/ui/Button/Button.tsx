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
import clsx from 'clsx'

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
    { icon, children, disabled, href, onClick, fullWidth, className, ...props },
    ref: Ref<HTMLButtonElement>
  ) => {
    const classes = useStyles()

    const IconComponent: any = icon ? iconButtonMap[icon] : null
    const startIcon = icon ? { startIcon: <IconComponent /> } : undefined
    const linkProps = href ? { href: href, component: Link } : undefined

    const classesButton = clsx(classes.button, className)

    return (
      <MuiButton
        ref={ref}
        color="primary"
        variant="contained"
        size="small"
        disabled={disabled}
        className={classesButton}
        fullWidth={fullWidth}
        {...startIcon}
        {...linkProps}
        onClick={!disabled ? onClick : noop}
        {...props}
      >
        {children}
      </MuiButton>
    )
  }
)

Button.defaultProps = defaultProps
Button.displayName = 'Button'

export default Button
