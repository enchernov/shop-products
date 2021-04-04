import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    headline: {
      width: '100%',
      padding: '20px 0',
    },
    root: {
      flexGrow: 1,
      display: 'flex',
      marginTop: 20,
      paddingBottom: 40,
    },
    contactContanier: {
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
