import React, { forwardRef, FunctionComponent, Ref } from 'react'
import {
  // TextFieldProps,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@material-ui/core'

import IconButton from '../IconButton'
import { useStyles } from './Input.styles'
import clsx from "clsx";

type InputTypeType = 'text' | 'email' | 'password' | 'checkbox'
type IconType = 'search' | 'visibility' | 'visibilityOff'
type VariantType = 'standard' | 'filled' | 'outlined'

export interface IInputProps {
  className: string
  disabled?: boolean
  value?: string
  id: string
  required?: boolean
  label: string
  type?: InputTypeType
  icon?: IconType
  name: string
  variant?: VariantType
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  checked?: boolean
  onInputChange?: () => void
  onIconClick?: () => void
  onCheckBoxChange?: () => void
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
      onInputChange,
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
      onCheckBoxChange,
      ...props
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const classes = useStyles()

    const classesInput = clsx(classes.input, className)

    const endAdornment = icon
      ? {
          endAdornment: (
            <IconButton icon={icon} disabled={disabled} onClick={onIconClick} />
          ),
        }
      : undefined

    if (type === 'checkbox') {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={onCheckBoxChange}
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
        helperText={error ? error : helperText}
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
        onChange={onInputChange}
        color={error ? 'secondary' : 'primary'}
        fullWidth={fullWidth}
        {...props}
      />
    )
  }
)

Input.defaultProps = defaultProps

export default Input
