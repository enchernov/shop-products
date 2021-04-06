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
      maxWidth: 450,
      width: '66vw',
      fontSize: 18,
      padding: '.5rem .25rem',
    },
    item: {
      maxWidth: 450,
      width: '66vw',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#e0e0e0',
    },
  })
)
