import React, { FunctionComponent, ReactNode } from 'react'
import Box from '@material-ui/core/Box'

import { useStyles } from './TabPanel.styles'

export interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

const TabPanel: FunctionComponent<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  const classes = useStyles()

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={classes.panel}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

export default TabPanel
