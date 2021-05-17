import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    headline: {
      width: '100%',
      paddingBottom: 20,
    },
    root: {
      flexGrow: 1,
      display: 'flex',
      marginTop: 20,
      paddingBottom: 40,
    },
    '@keyframes slideDown': {
      from: {
        transform: 'translateY(-10px)',
        opacity: 0,
      },
      to: {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
    contactContainer: {
      opacity: 0,
      transform: 'translateY(-10px)',
      animationName: '$slideDown',
      animationDuration: '1s',
      animationIterationCount: '1',
      animationTimingFunction: 'ease',
      animationFillMode: 'forwards',
      animationDirection: 'normal',
      padding: 16,
      '& img': {
        width: '100%',
      },
    },
    button: {
      padding: '12px 24px',
      color: 'white',
    },
  })
)
