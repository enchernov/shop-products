import React, { FunctionComponent, ReactNode } from 'react'
import MuiAccordion from '@material-ui/core/Accordion'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  Typography,
  AccordionSummary,
  AccordionDetails,
  AccordionProps,
} from '@material-ui/core'

import { useStyles } from './Accordion.styles'

interface IAccordionProps {
  children: ReactNode
  title: string
}

const Accordion: FunctionComponent<IAccordionProps & AccordionProps> = ({
  children,
  title,
  ...props
}) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <MuiAccordion {...props} className={classes.root} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls={`accordion_${title}`}
          id={`accordion_${title}`}
          classes={{ root: classes.summary }}
        >
          <Typography className={classes.title}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </MuiAccordion>
    </div>
  )
}
export default Accordion
