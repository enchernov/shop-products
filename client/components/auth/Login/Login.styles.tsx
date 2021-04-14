import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      maxWidth: 420,
      '&:not(:last-child)': {
        marginBottom: 20,
      },
    },
    heading: {
      marginBottom: '1rem',
    },
    serviceHeading: {
      marginBottom: 20,
      marginTop: 0,
    },
    formPaper: {
      padding: '24px 40px',
    },
    registerPaper: {
      padding: 20,
    },
    form: {
      marginBottom: 20,
    },
    input: {
      marginBottom: 30,
    },
    input_error: {
      marginBottom: 8,
    },
    button: {
      padding: 15,
      marginBottom: 20,
      // color: theme.palette.primary.contrastText,
    },
    error: {
      color: theme.palette.error.main,
      minHeight: 20,
      margin: '0 0 10px 0',
      width: '100%',
      textAlign: 'center',
    },
  })
)
