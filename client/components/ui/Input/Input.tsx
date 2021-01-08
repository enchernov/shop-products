import React, { forwardRef, FunctionComponent, Ref } from 'react'
import { FormControlLabel, Checkbox, TextField } from '@material-ui/core'

import { IconButton } from '@ui/index'
import clsx from 'clsx'

import { useStyles } from './Input.styles'

type InputTypeType = 'text' | 'email' | 'password' | 'checkbox' | 'file'
type IconType = 'search' | 'visibility' | 'visibilityOff' | 'link'
type VariantType = 'standard' | 'filled' | 'outlined'

export interface IInputProps {
  className?: string
  disabled?: boolean
  value?: any
  id: string
  required?: boolean
  label: string
  type: InputTypeType
  icon?: IconType
  name?: string
  variant?: VariantType
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  checked?: boolean
  onChange?: any
  onIconClick?: () => void
}

const defaultProps: Partial<IInputProps> = {
  disabled: false,
}

type DefaultProps = Readonly<typeof defaultProps>

type InputPropsType = IInputProps & DefaultProps

const Input: FunctionComponent<InputPropsType> = forwardRef(
  (
    {
      className,
      disabled,
      onChange,
      onIconClick,
      value,
      id,
      label,
      type,
      icon,
      name,
      variant,
      error,
      helperText,
      required,
      fullWidth,
      checked,
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
              disabled={disabled}
              onClick={onIconClick}
              disableFocusRipple={true}
            />
          ),
        }
      : undefined

    if (type === 'checkbox') {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={onChange}
              name={name}
              color="primary"
            />
          }
          label={label}
        />
      )
    }

    return (
      <TextField
        ref={ref}
        className={classesInput}
        helperText={helperText}
        id={id}
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
        {...props}
      />
    )
  }
)

Input.defaultProps = defaultProps

export default Input
