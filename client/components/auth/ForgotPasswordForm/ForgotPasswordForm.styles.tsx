import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginBottom: 20,
    },
    button: {
      padding: 15,
      marginBottom: theme.spacing(3),
    },
    input_error: {
      marginBottom: theme.spacing(2),
    },
  })
)
