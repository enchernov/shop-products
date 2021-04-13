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
    },
  })
)
