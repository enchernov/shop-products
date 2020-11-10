import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      maxWidth: 400,
      '&:not(:last-child)': {
        marginBottom: 10,
      },
    },
    heading: {
      margin: '0 0 20px 0',
    },
    serviceHeading: {
      marginBottom: 10,
      marginTop: 0,
    },
    formPaper: {
      padding: 40,
    },
    loginPaper: {
      padding: 20,
    },
    input: {
      marginBottom: 20,
    },
    button: {
      padding: 15,
      marginBottom: 20,
    },
    error: {
      color: theme.palette.error.main,
    },
  })
)
