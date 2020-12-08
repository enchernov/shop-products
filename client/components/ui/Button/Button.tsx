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
import { Edit, AddSharp, Delete, Save } from '@material-ui/icons'
import clsx from 'clsx'

import Link from '../Link'

import { useStyles } from './Button.styles'

type ButtonIconType = 'create' | 'edit' | 'delete' | 'save'

export interface IButtonProps extends ButtonProps {
  children: ReactNode
  icon?: ButtonIconType
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

type ButtonPropsType = IButtonProps & DefaultProps

const iconButtonMap: Record<ButtonIconType, ElementType<SvgIconProps>> = {
  create: AddSharp,
  edit: Edit,
  delete: Delete,
  save: Save,
}

const Button: FunctionComponent<ButtonPropsType> = forwardRef(
  (
    { icon, children, disabled, href, onClick, fullWidth, className, ...props },
    ref: Ref<HTMLButtonElement>
  ) => {
    const classes = useStyles()
    const classesButton = clsx(classes.button, className)

    const IconComponent: any = icon ? iconButtonMap[icon] : null
    const startIcon = icon ? { startIcon: <IconComponent /> } : undefined
    const linkProps = href ? { href: href, component: Link } : undefined

    return (
      <MuiButton
        ref={ref}
        variant="contained"
        size="small"
        disabled={disabled}
        className={classesButton}
        fullWidth={fullWidth}
        {...startIcon}
        {...linkProps}
        onClick={onClick}
        {...props}
      >
        {children}
      </MuiButton>
    )
  }
)

Button.defaultProps = defaultProps

export default Button
