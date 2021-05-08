import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    placeOrderRoot: {
      padding: 20,
      backgroundColor: 'transparent',
    },
    button: {
      color: 'white',
      marginTop: 20,
    },
  })
)
