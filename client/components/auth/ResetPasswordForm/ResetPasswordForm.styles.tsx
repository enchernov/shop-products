import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    input: {
      marginBottom: 20,
    },
    button: {
      color: 'white',
      padding: 15,
    },
  })
)
