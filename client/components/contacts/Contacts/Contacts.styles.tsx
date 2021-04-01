import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
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
