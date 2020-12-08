import React, { FunctionComponent, forwardRef, Ref, ReactNode } from 'react'
import { Badge as MuiBadge, BadgeProps } from '@material-ui/core'
import clsx from 'clsx'

import { useStyles } from './Badge.styles'

export interface IBadgeProps extends BadgeProps {
  badgeContent: ReactNode
  children: ReactNode
  className?: string
}

const Badge: FunctionComponent<IBadgeProps> = forwardRef(
  ({ badgeContent, children, className, ...props }, ref: Ref<any>) => {
    const classes = useStyles()
    const classesBadge = clsx(classes.badge, className)

    return (
      <MuiBadge
        ref={ref}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={badgeContent}
        overlap="circle"
        color="secondary"
        className={classesBadge}
        {...props}
      >
        {children}
      </MuiBadge>
    )
  }
)

export default Badge
