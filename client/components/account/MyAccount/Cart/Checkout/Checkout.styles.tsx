import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 20,
    },
    button: {
      color: 'white',
    },
    cardInput: {
      width: 450,
      fontSize: 18,
      padding: '.5rem .25rem',
    },
    item: {
      width: 300,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#e0e0e0',
    },
  })
)
