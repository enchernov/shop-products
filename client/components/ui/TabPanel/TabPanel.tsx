import React, { FunctionComponent, ReactNode } from 'react'
import Box from '@material-ui/core/Box'

import { useStyles } from './TabPanel.styles'
import { useMediaQuery, useTheme } from '@material-ui/core'

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
  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={classes.panel}
      {...other}
    >
      {value === index && (
        <Box
          p={3}
          style={
            isSmallWidth
              ? { paddingLeft: 0, paddingRight: 0 }
              : {}
          }
        >
          {children}
        </Box>
      )}
    </div>
  )
}

export default TabPanel
