import React, { FunctionComponent, forwardRef, Ref, ReactNode } from 'react'
import { Avatar as MuiAvatar, AvatarProps } from '@material-ui/core'
import clsx from 'clsx'

import { useStyles } from './Avatar.styles'

export interface IAvatarProps extends AvatarProps {
  src?: string
  alt?: string
  children?: ReactNode
  className?: string
}

const Avatar: FunctionComponent<IAvatarProps> = forwardRef(
  ({ src, alt, children, className, ...props }, ref: Ref<any>) => {
    const classes = useStyles()
    const classesAvatar = clsx(classes.avatar, className)

    return (
      <MuiAvatar
        ref={ref}
        src={src}
        alt={alt}
        className={classesAvatar}
        {...props}
      >
        {children}
      </MuiAvatar>
    )
  }
)

export default Avatar
