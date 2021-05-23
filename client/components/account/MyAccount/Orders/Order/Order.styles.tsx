import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
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
      opacity: 0,
      animationName: '$fadeIn',
      animationDuration: '1s',
      animationIterationCount: '1',
      animationTimingFunction: 'ease',
      animationFillMode: 'forwards',
      animationDirection: 'normal',
      height: 'auto',
      width: 'auto',
      padding: 20,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      '&:hover': {
        boxShadow:
          'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
      },
    },
    makeAgainButton: {
      '&:hover': {
        boxShadow: 'none',
      },
    },
  })
)
