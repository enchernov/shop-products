import React, { FunctionComponent, forwardRef, Ref, ReactNode } from 'react'
import { Avatar as MuiAvatar, AvatarProps } from '@material-ui/core'
import clsx from 'clsx'

import { useStyles } from './Avatar.styles'

type VariantType = 'square' | 'circle'

export interface IAvatarProps extends AvatarProps {
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

type AvatarPropsType = IAvatarProps & DefaultProps

const Avatar: FunctionComponent<AvatarPropsType> = forwardRef(
  ({ variant, src, alt, children, className, ...props }, ref: Ref<any>) => {
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
        {...props}
      >
        {children}
      </MuiAvatar>
    )
  }
)

Avatar.defaultProps = defaultProps

export default Avatar
