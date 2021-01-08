import React, { FunctionComponent } from 'react'
import { Divider as MuiDivider, DividerProps } from '@material-ui/core'
import clsx from 'clsx'

import { useStyles } from './Divider.styles'

type DividerType = 'wide' | 'regular' | 'thin'
type StyleType = 'solid' | 'dotted' | 'dashed' | 'double' | 'groove' | 'none'

export interface IDividerProps {
  type?: DividerType
  style?: StyleType
  className?: string
}

const defaultProps: Partial<IDividerProps> = {
  type: 'regular',
  style: 'solid',
}

type DefaultProps = Readonly<typeof defaultProps>

type DividerPropsType = DividerProps & IDividerProps & DefaultProps

const Divider: FunctionComponent<DividerPropsType> = ({
  className,
  type,
  style,
  ...props
}) => {
  const classes = useStyles()

  const classesDivider = clsx(
    classes.divider,
    className,
    type ? classes[type] : null,
    style ? classes[style] : null
  )

  return <MuiDivider className={classesDivider} {...props} />
}

export default Divider
