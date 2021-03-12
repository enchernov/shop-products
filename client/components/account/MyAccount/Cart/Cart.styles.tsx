import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    placeOrderRoot: {
      padding: 20,
      minWidth: 200,
    },
    button: {
      color: 'white',
    },
  })
)
