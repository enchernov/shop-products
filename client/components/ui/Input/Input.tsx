import React, { forwardRef, FunctionComponent, Ref } from 'react'
import { TextField } from '@material-ui/core'

import { IconButton } from '@ui/index'
import clsx from 'clsx'

import { useStyles } from './Input.styles'

import { IconType } from '@ui/IconButton/IconButton'

type VariantType = 'standard' | 'filled' | 'outlined'

export interface IInputProps {
  className?: string
  disabled?: boolean
  value?: any
  id?: string
  required?: boolean
  label?: string
  icon?: IconType
  color?: 'primary' | 'secondary'
  iconColor?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined
  name?: string
  variant?: VariantType
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  checked?: boolean
  iconDisabled?: boolean
  onChange?: any
  onKeyPress?: any
  onIconClick?: any
  type?: string
  multiline?: boolean
  rowsMax?: number
  rows?: number
}
//
// const defaultProps: Partial<IInputProps> = {
//   disabled: false,
// }
//
// type DefaultProps = Readonly<typeof defaultProps>

type InputPropsType = IInputProps //& DefaultProps

const Input: FunctionComponent<InputPropsType> = forwardRef(
  (
    {
      className,
      disabled,
      onChange,
      onIconClick,
      label,
      type,
      icon,
      name,
      iconDisabled,
      iconColor,
      id,
      helperText,
      required,
      variant,
      value,
      error,
      fullWidth,
      color,
      multiline,
      rowsMax,
      rows,
      ...props
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const classes = useStyles()

    const classesInput = clsx(classes.input, className)

    const endAdornment = icon
      ? {
          endAdornment: (
            <IconButton
              icon={icon}
              disabled={disabled || iconDisabled}
              onClick={onIconClick}
              disableFocusRipple={true}
              color={iconColor}
            />
          ),
        }
      : undefined

    return (
      <TextField
        ref={ref}
        className={classesInput}
        helperText={helperText}
        id={id}
        color={color}
        name={name}
        required={required}
        type={type}
        variant={variant}
        value={value}
        InputProps={endAdornment}
        error={error}
        disabled={disabled}
        label={label}
        onChange={onChange}
        fullWidth={fullWidth}
        multiline={multiline}
        rowsMax={rowsMax}
        rows={rows}
        {...props}
      />
    )
  }
)

// Input.defaultProps = defaultProps

export default Input
