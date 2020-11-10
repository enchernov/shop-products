import React, { FunctionComponent, forwardRef, Ref, ReactNode } from 'react'
import { Avatar as MuiAvatar, AvatarProps } from '@material-ui/core'
import { useStyles } from './Avatar.styles'
import clsx from 'clsx'

type VariantType = 'square' | 'rounded'

export interface IAvatarProps {
  variant?: VariantType
  src?: string
  alt?: string
  children?: ReactNode
  className?: string
}

const defaultProps: Partial<IAvatarProps> = {
  variant: 'square',
}

type DefaultProps = Readonly<typeof defaultProps>

type AvatarPropsType = AvatarProps & IAvatarProps & DefaultProps

const Avatar: FunctionComponent<AvatarPropsType> = forwardRef(
  ({ variant, src, alt, children, className }, ref: Ref<any>) => {
    const classes = useStyles()

    const variantProps = variant ? { variant } : undefined

    const classesAvatar = clsx(classes.avatar, className)

    return (
      <MuiAvatar
        ref={ref}
        src={src}
        alt={alt}
        className={classesAvatar}
        {...variantProps}
      >
        {children}
      </MuiAvatar>
    )
  }
)

Avatar.defaultProps = defaultProps
Avatar.displayName = 'Avatar'

export default Avatar
