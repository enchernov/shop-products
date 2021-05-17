import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    '@keyframes fadeIn': {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
    root: {
      maxWidth: 450,
      width: '66vw',
    },
    item: {
      opacity: 0,
      animationName: '$fadeIn',
      animationDuration: '1s',
      animationIterationCount: '1',
      animationTimingFunction: 'ease',
      animationFillMode: 'forwards',
      animationDirection: 'normal',
      maxWidth: 450,
      width: '66vw',
      padding: 20,
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      '&:hover': {
        boxShadow:
          'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
      },
    },
  })
)
