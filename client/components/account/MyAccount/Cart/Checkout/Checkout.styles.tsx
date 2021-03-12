import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
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
  })
)
