import React, { forwardRef, FunctionComponent, Ref } from 'react'
import {
  FormControlLabel,
  Checkbox,
  TextField,
  TextFieldProps,
} from '@material-ui/core'

import { IconButton } from '@ui/index'
import clsx from 'clsx'

import { useStyles } from './Input.styles'

import { IconType } from '@ui/IconButton/IconButton'

// type VariantType = 'standard' | 'filled' | 'outlined'

export interface IInputProps {
  // className?: string
  // disabled?: boolean
  // value?: any
  // id: string
  // required?: boolean
  // label: string
  icon?: IconType
  // name?: string
  // variant?: VariantType
  error?: boolean
  // helperText?: string
  fullWidth?: boolean
  checked?: boolean
  // onChange?: any
  onIconClick?: () => void
  // type: string
}

const defaultProps: Partial<IInputProps & TextFieldProps> = {
  disabled: false,
}

type DefaultProps = Readonly<typeof defaultProps>

type InputPropsType = IInputProps & DefaultProps & TextFieldProps

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
              {...props}
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
        // helperText={helperText}
        // id={id}
        name={name}
        // required={required}
        type={type}
        // variant={variant}
        // value={value}
        InputProps={endAdornment}
        // error={error}
        disabled={disabled}
        label={label}
        onChange={onChange}
        // fullWidth={fullWidth}
        {...props}
      />
    )
  }
)

Input.defaultProps = defaultProps

export default Input
